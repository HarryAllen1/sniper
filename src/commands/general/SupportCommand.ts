import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';

export default class SupportCommand extends BaseCommand {
  constructor() {
    super(
      'support',
      'general',
      ['server', 'community'],
      5000,
      'Gives an invite for the support server.',
      { argsRequired: false }
    );
  }

  async run(client: DiscordClient, message: Message) {
    message.reply('https://discord.gg/uShPGFDJCJ');
  }
}
