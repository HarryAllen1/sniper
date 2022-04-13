import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { exec } from 'child_process';
import { ConfirmationMessage } from '../../utils/helpers/interactions.js';

export default class RestartCommand extends BaseCommand {
  constructor() {
    super('restart', 'restricted', [], 5000, '');
  }

  async run(client: DiscordClient, message: Message) {
    new ConfirmationMessage(
      message,
      new MessageEmbed()
        .setTitle('Are you sure you want to restart Sniper?')
        .setColor('GREEN')
    ).on('confirm', (i) => {
      i.reply('restarting sniper....');
      exec('pm2 restart sniper');
    });
  }
}
