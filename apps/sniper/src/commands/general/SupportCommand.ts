import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import Command from '../../utils/structures/BaseCommand.js';

export default class SupportCommand extends Command {
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
