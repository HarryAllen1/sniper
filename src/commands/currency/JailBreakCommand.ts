import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class JailBreakCommand extends BaseCommand {
  constructor() {
    super(
      'jailbreak',
      'currency',
      [],
      900000,
      'If you are in jail, this command will attempt to break you out. You could fail however, and have to be in jail for longer.',
      {
        cooldownMessage: 'You need to rest.',
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('not implemented yet');
  }
}
