import { SlashCommandBuilder } from '@discordjs/builders';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import {
  Constants,
  Message,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  version,
  WebhookEditMessageOptions,
} from 'discord.js';
import { camelCase, startCase } from 'lodash-es';
import ms from 'ms';
import type DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { capitalizeFirstLetter } from '../../utils/helpers/string.js';
import { helpCommandHelperCollection } from '../../utils/registry.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class HelpCommand extends BaseCommand {
  constructor() {
    super(
      'help',
      'general',
      ['commands', 'command'],
      1000,
      'Shows all commands and their descriptions',
      {
        argsDescription: '[category or command name]',
        argsRequired: false,
      }
    );
  }

  interactionData = new SlashCommandBuilder()
    .setName('help')
    .setDescription(
      'DONT USES THIS. SLASH COMMANDS WILL BE AVAILABLE AFTER A REWRITE'
    );

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const categories = [...helpCommandHelperCollection.keys()];
    const menu: MessageSelectOptionData[] = [];

    const updateHelpMessageExceptItReturnsTheEmbed = (
      index: number
    ): WebhookEditMessageOptions => {
      const // descriptions = helpCommandHelper[categories[index]].commands;
        descriptions = helpCommandHelperCollection.get(
          categories[index]
        )?.commands;
      return {
        embeds: [
          {
            title: categories[index],
            description:
              'Key:\n[argument]: Optional argument\n<argument>: Required argument\n[argument] <argument>: If the first argument is specified, the second argument MUST be specified.',
            color: 'WHITE',
            fields: [
              {
                name: 'To view more info about a command, use the help command followed by the command name.',
                value:
                  descriptions?.map((v) => `\`${v.name}\``).toString() || ' ',
              },
            ],
          },
        ],
      };
    };

    const pages: WebhookEditMessageOptions[] = [
      {
        embeds: [
          {
            title: 'Command Help',
            description: `Everything is case insensitive. Made using Discord.js v${version}.\n[View source code](https://github.com/MajesticString/sniper)`,
            fields: [
              {
                name: 'Catagories',
                value: `${categories.map((category) => `\`${category}\``)}`,
              },
            ],
            color: 'WHITE',
            footer: { text: 'made by ||harry potter||#0014' },
          },
        ],
      },
    ];
    for (let i = 0; i < helpCommandHelperCollection.size; i++) {
      pages.push(updateHelpMessageExceptItReturnsTheEmbed(i));
    }

    try {
      if (args[0]) {
        const command =
          client.commands.get(args[0]) ||
          client.commands.find(
            (v, k) =>
              k.toLowerCase().startsWith(args[0].toLowerCase()) ||
              v.aliases
                .map((v) => v.toLowerCase())
                .includes(args[0].toLowerCase())
          );
        if (command)
          reply(message, {
            title: `${
              command?.disabled ? '(DISABLED!!!) ' : ''
            }${capitalizeFirstLetter(command?.name)}`,
            description: command?.description,
            fields: [
              command.argsDescription
                ? {
                    name: 'Arguments',
                    value: command.argsDescription,
                  }
                : { name: 'Arguments', value: 'No arguments' },
              {
                name: 'Aliases',
                value: command.aliases.join(', ') || 'None',
              },

              {
                name: 'Category',
                value: command.category,
              },
              {
                name: 'Cooldown',
                value: command.cooldown
                  ? ms(command.cooldown, { long: true })
                  : 'None',
              },
              {
                name: 'Permissions',
                value:
                  command.permissionsRequired
                    .map((val) => `\`${startCase(camelCase(val))}\``)
                    .join(', ') || '`sendMessages`',
              },
            ],
          });
        else {
          reply(message, {
            title: 'Command not found',
            color: 'RED',
          });
        }
        return;
      }
      if (message.type === 'APPLICATION_COMMAND')
        await reply(
          message,
          // eslint-disable-next-line
          // @ts-ignore
          pages[0].embeds[0],
          {
            components: [
              new MessageActionRow().addComponents(
                new MessageSelectMenu()
                  .setCustomId('categorySelect')
                  .setPlaceholder('Category of commands')
                  .addOptions(menu)
              ),
            ],
          }
        );
      else {
        const paginator = new PaginatedMessage({ pages }).setActions([
          {
            customId: '@sapphire/paginated-messages.firstPage',
            style: 'PRIMARY',
            emoji: '⏪',
            type: Constants.MessageComponentTypes.BUTTON,
            run: ({ handler }) => (handler.index = 0),
          },
          {
            customId: '@sapphire/paginated-messages.previousPage',
            style: 'PRIMARY',
            emoji: '◀️',
            type: Constants.MessageComponentTypes.BUTTON,
            run: ({ handler }) => {
              if (handler.index === 0) {
                handler.index = handler.pages.length - 1;
              } else {
                --handler.index;
              }
            },
          },
          {
            customId: '@sapphire/paginated-messages.nextPage',
            style: 'PRIMARY',
            emoji: '▶️',
            type: Constants.MessageComponentTypes.BUTTON,
            run: ({ handler }) => {
              if (handler.index === handler.pages.length - 1) {
                handler.index = 0;
              } else {
                ++handler.index;
              }
            },
          },
          {
            customId: '@sapphire/paginated-messages.goToLastPage',
            style: 'PRIMARY',
            emoji: '⏩',
            type: Constants.MessageComponentTypes.BUTTON,
            run: ({ handler }) => (handler.index = handler.pages.length - 1),
          },
          {
            customId: '@sapphire/paginated-messages.stop',
            style: 'DANGER',
            emoji: '⏹️',
            type: Constants.MessageComponentTypes.BUTTON,
            run: ({ collector }) => {
              collector.stop();
            },
          },
          {
            customId: '@sapphire/paginated-messages.goToPage',
            type: Constants.MessageComponentTypes.SELECT_MENU,
            run: ({ handler, interaction }) =>
              interaction.isSelectMenu() &&
              (handler.index = parseInt(interaction.values[0], 10)),
          },
        ]);
        paginator.run(message);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
