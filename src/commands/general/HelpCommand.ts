import {
  Message,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  version,
} from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { helpCommandHelperCollection } from '../../utils/registry';
import { reply } from '../../utils/helpers/reply';
import { SlashCommandBuilder } from '@discordjs/builders';
import ms from 'ms';
import { log } from '../../utils/helpers/console';

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
  slashCommand = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Sends the sniper help command')
    .toJSON();
  async run(client: DiscordClient, message: Message, args: Array<string>) {
    // const categories = Object.keys(helpCommandHelper);
    const categories = [...helpCommandHelperCollection.keys()];
    let menu: any[] = [];
    helpCommandHelperCollection.forEach((value, key) => {
      menu.push({
        label: key,
        value: key,
      });
    });
    categories.forEach((category) => {
      menu.push({ label: category, value: category });
    });
    log(menu);
    try {
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
        let row = new MessageActionRow().addComponents(
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
          let // descriptions = helpCommandHelper[categories[index]].commands;
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
                fields: descriptions,
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
        let timeout = ms('15s');
        let timer = setTimeout(() => {
          void disableHelpMessage();
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
          if (i.member?.user.id !== message.author.id) {
            i.reply({ content: "This isn't your command.", ephemeral: true });
            return;
          }
          if (i.customId === 'end') {
            void disableHelpMessage();
          } else if (i.customId === 'first') {
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
            } else {
            }
          } else if (i.customId === 'last') {
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
