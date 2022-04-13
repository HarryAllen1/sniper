import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { ConfirmationMessage } from '../../utils/helpers/interactions.js';
import { exec } from 'child_process';

export default class UpdateCommand extends BaseCommand {
  constructor() {
    super('update', 'restricted', [], 5000, '');
  }

  async run(client: DiscordClient, message: Message) {
    new ConfirmationMessage(message, {
      title: 'Are you sure you want to update Sniper?',
      description: 'This will also restart the bot.',
    }).on('confirm', (i) => {
      i.reply('Updating sniper....');
      exec(
        'rm ../../pnpm-lock.yaml && git pull && pnpm i && npm run build && pm2 restart sniper'
      );
    });
  }
}
