import {
  Message,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  version,
} from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { helpCommandHelperCollection } from '../../utils/registry.js';
import { disableAllComponents, reply } from '../../utils/helpers/message.js';
import ms from 'ms';
import { capitalizeFirstLetter } from '../../utils/helpers/string.js';
import { log } from '../../utils/helpers/console.js';
import { camelCase, startCase } from 'lodash-es';

export default class HelpCommand extends BaseCommand {
  constructor() {
    super(
      'help',
      'general',
      ['commands', 'command'],
      1000,
      'Shows all commands and their descriptions'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    // const categories = Object.keys(helpCommandHelper);
    const categories = [...helpCommandHelperCollection.keys()];
    const menu: any[] = [];
    helpCommandHelperCollection.forEach((value, key) => {
      menu.push({
        label: key,
        value: key,
      });
    });
    categories.forEach((category) => {
      menu.push({ label: category, value: category });
    });

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
          {
            title: 'Command Help',
            description: `Made using Discord.js v${version}.\n[View source code](https://github.com/MajesticString/sniper)\nThis bot is in its beta stage, so expect bugs.`,
            fields: [
              {
                name: 'Catagories',
                value: `${categories.map((category) => `\`${category}\``)}`,
              },
            ],
            color: 'WHITE',
            footer: { text: 'made by ||harry potter||#0014' },
          },
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
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setEmoji('⏪')
            .setStyle('PRIMARY')
            .setCustomId('first'),
          new MessageButton()
            .setEmoji('⬅️')
            .setStyle('PRIMARY')
            .setCustomId('back'),
          new MessageButton()
            .setStyle('PRIMARY')
            .setEmoji('⏹️')
            .setCustomId('end'),
          new MessageButton()
            .setEmoji('➡️')
            .setStyle('PRIMARY')
            .setCustomId('next'),
          new MessageButton()
            .setEmoji('⏩')
            .setStyle('PRIMARY')
            .setCustomId('last')
        );
        let categoriesIndex = -1;
        const updateHelpMessage = async (index: number): Promise<Message> => {
          const // descriptions = helpCommandHelper[categories[index]].commands;
            descriptions = helpCommandHelperCollection.get(
              categories[index]
            )?.commands;

          return await msg.edit({
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
                      descriptions?.map((v) => `\`${v.name}\``).toString() ||
                      ' ',
                  },
                ],
              },
            ],
          });
        };
        const msg = await reply(
          message,
          {
            title: 'Command Help',
            description: `Everything is case insensitive. Made using Discord.js v${version}.\n[View source code](https://github.com/MajesticString/sniper)\nThis bot is in its beta stage, so expect bugs.`,
            fields: [
              {
                name: 'Catagories',
                value: `${categories.map((category) => `\`${category}\``)}`,
              },
            ],
            color: 'WHITE',
            footer: { text: 'made by ||harry potter||#0014' },
          },
          {
            components: [row],
          }
        );
        const disableHelpMessage = async (): Promise<Message> => {
          return await msg.edit({
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setEmoji('⏪')
                  .setStyle('PRIMARY')
                  .setCustomId('first')
                  .setDisabled(true),
                new MessageButton()
                  .setEmoji('⬅️')
                  .setStyle('PRIMARY')
                  .setCustomId('back')
                  .setDisabled(true),
                new MessageButton()
                  .setStyle('PRIMARY')
                  .setEmoji('⏹️')
                  .setDisabled(true)
                  .setCustomId('end'),
                new MessageButton()
                  .setEmoji('➡️')
                  .setStyle('PRIMARY')
                  .setDisabled(true)
                  .setCustomId('next'),
                new MessageButton()
                  .setEmoji('⏩')
                  .setStyle('PRIMARY')
                  .setDisabled(true)
                  .setCustomId('last')
              ),
            ],
          });
        };
        const timeout = ms('15s');
        const timer = setTimeout(() => {
          disableAllComponents(msg);
        }, timeout);
        timer;

        const buttonCollector = msg.createMessageComponentCollector({
          componentType: 'BUTTON',

          // time: 15000,
          // filter: (i) => {
          //   i.deferUpdate();
          //   i.deferReply();
          //   // if (i.user.id !== message.author.id) {
          //   //   i.reply({ content: "This isn't your command.", ephemeral: true });
          //   // }
          //   return i.user.id === message.author.id;
          // },
        });

        buttonCollector.on('collect', async (i) => {
          i.deferUpdate();
          // timeout += ms('15s');
          clearTimeout(timer);
          timer;
          if (i.user.id !== message.author.id) {
            i.reply({
              content: "This isn't your command.",
              ephemeral: true,
            }).catch(() => {
              log('still deosnt woork');
            });
            return;
          }
          if (i.customId === 'end') {
            void disableHelpMessage();
          } else if (i.customId === 'first') {
            categoriesIndex = 0;
            await updateHelpMessage(categoriesIndex);
          } else if (i.customId === 'back') {
            if (
              categoriesIndex >= 1 &&
              categoriesIndex <= categories.length + 1
            ) {
              categoriesIndex--;
              updateHelpMessage(categoriesIndex);
            }
          } else if (i.customId === 'next') {
            if (
              categoriesIndex >= -1 &&
              categoriesIndex < categories.length - 1
            ) {
              categoriesIndex++;
              updateHelpMessage(categoriesIndex);
            }
          } else if (i.customId === 'last') {
            categoriesIndex = categories.length - 1;
            await updateHelpMessage(categoriesIndex);
          }
        });

        // const backCollector = msg.createReactionCollector({
        //   filter: (reaction, user) =>
        //     reaction.emoji.name === '⬅️' && user.id === message.author.id,
        //   time: 15000,
        // });
        // backCollector.on('collect', (reaction, user) => {
        //   reaction.users.remove(user);
        //   if (
        //     categoriesIndex >= 1 &&
        //     categoriesIndex <= categories.length + 1
        //   ) {
        //     categoriesIndex--;
        //     updateHelpMessage(categoriesIndex);
        //   }
        // });
        // const nextCollector = msg.createReactionCollector({
        //   filter: (reaction, user) =>
        //     reaction.emoji.name === '➡️' && user.id === message.author.id,
        //   time: 15000,
        // });
        // nextCollector.on('collect', (reaction, user) => {
        //   reaction.users.remove(user);
        //   if (
        //     categoriesIndex >= -1 &&
        //     categoriesIndex < categories.length - 1
        //   ) {
        //     categoriesIndex++;
        //     updateHelpMessage(categoriesIndex);
        //   } else {
        //   }
        // });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
