import { Message, MessageActionRow, MessageSelectMenu } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { helpCommandHelper } from '../../utils/registry';

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

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const categories = Object.keys(helpCommandHelper);
    let menu: any[] = [];
    categories.forEach((category) => {
      menu.push({ label: category, value: category });
    });
    try {
      message.reply({
        embeds: [
          {
            title: 'Command Help',
            description:
              'View source code here (not available yet). This bot is in its beta stage, so expect bugs.',
            fields: [
              {
                name: 'Catagories',
                value: `${categories.map((category) => `\`${category}\``)}`,
              },
            ],
          },
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageSelectMenu()
              .setCustomId('categorySelect')
              .setPlaceholder('Category of commands')
              .addOptions(menu)
          ),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
