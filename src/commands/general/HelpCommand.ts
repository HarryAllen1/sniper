import {
  Message,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  version,
} from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { helpCommandHelper } from '../../utils/registry';
import { reply } from '../../utils/helpers/reply';
import { SlashCommandBuilder } from '@discordjs/builders';

export default class HelpCommand extends BaseCommand {
  constructor() {
    super(
      'help',
      'general',
      [],
      1000,
      'Shows all commands and their descriptions'
    );
  }
  slashCommand = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Sends the sniper help command')
    .toJSON();
  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const categories = Object.keys(helpCommandHelper);
    let menu: any[] = [];
    categories.forEach((category) => {
      menu.push({ label: category, value: category });
    });
    try {
      if (message.type === 'APPLICATION_COMMAND')
        await reply(
          message,
          {
            title:
              'Command Help: IF PEOPLE ARE USING THIS COMMAND AND YOU DONT WANT THEM TO USE THE SLASH COMMAND VERSION OF THIS (/help)',
            description: `Made using Discord.js v${version}.\n[View source code](https://github.com/MajesticString/sniper)\nThis bot is in its beta stage, so expect bugs.`,
            fields: [
              {
                name: 'Catagories',
                value: `${categories.map((category) => `\`${category}\``)}`,
              },
            ],
            color: 'WHITE',
          },
          {
            components: [
              new MessageActionRow().addComponents(
                new MessageSelectMenu()
                  .setCustomId('categorySelect')
                  .setPlaceholder('Category of commands')
                  .addOptions(menu)
              ),
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setCustomId('epicButton')
                  .setStyle('PRIMARY')
                  .setLabel('button')
              ),
            ],
          }
        );
      else {
        const msg = await reply(message, {
          title:
            'Command Help: If you want a more organized help menu, use the slash command version  (/help)',
          description: `Everything is case insensitive. Made using Discord.js v${version}.\n[View source code](https://github.com/MajesticString/sniper)\nThis bot is in its beta stage, so expect bugs.`,
          fields: [
            {
              name: 'Catagories',
              value: `${categories.map((category) => `\`${category}\``)}`,
            },
          ],
          color: 'WHITE',
        });

        await msg.react('⬅️');
        await msg.react('⏹️');
        await msg.react('➡️');
        const stopCollector = msg.createReactionCollector({
          filter: (reaction, user) =>
            reaction.emoji.name === '⏹️' && user.id === message.author.id,
          time: 15000,
        });
        stopCollector.on('collect', (reaction, user) => {
          msg.reactions.removeAll();
        });
        let catagoriesIndex = -1;
        const backCollector = msg.createReactionCollector({
          filter: (reaction, user) =>
            reaction.emoji.name === '⬅️' && user.id === message.author.id,
          time: 15000,
        });
        backCollector.on('collect', (reaction, user) => {
          reaction.users.remove(user);
          if (catagoriesIndex >= -1) {
            msg.edit({ allowedMentions: { repliedUser: false } });
          }
        });
        const nextCollector = msg.createReactionCollector({
          filter: (reaction, user) =>
            reaction.emoji.name === '➡️' && user.id === message.author.id,
          time: 15000,
        });
        nextCollector.on('collect', (reaction, user) => {
          reaction.users.remove(user);
          if (catagoriesIndex >= -1) {
            msg.edit({ allowedMentions: { repliedUser: false } });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
