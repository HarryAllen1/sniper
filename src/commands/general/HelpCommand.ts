import {
  Message,
  MessageActionRow,
  MessageSelectMenu,
  version,
} from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { helpCommandHelper } from '../../utils/registry';
import { reply } from '../../utils/helpers/reply';

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
      reply(
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
    } catch (error) {
      console.log(error);
    }
  }
}
