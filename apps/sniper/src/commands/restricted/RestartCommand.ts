import { exec } from 'child_process';
import { Colors, EmbedBuilder, Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { ConfirmationMessage } from '../../utils/helpers/interactions.js';
import { Command } from '../../utils/structures/BaseCommand.js';

export default class RestartCommand extends Command {
  constructor() {
    super('restart', 'restricted', [], 5000, '');
  }

  async run(client: DiscordClient, message: Message) {
    new ConfirmationMessage(
      message,
      new EmbedBuilder()
        .setTitle('Are you sure you want to restart Sniper?')
        .setColor(Colors.Green)
    ).on('confirm', (i) => {
      i.reply('restarting sniper....');
      exec('pm2 restart sniper');
    });
  }
}
