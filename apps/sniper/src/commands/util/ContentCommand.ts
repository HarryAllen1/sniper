import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { reply } from '#lib/message.js';

export default class ContentCommand extends BaseCommand {
  constructor() {
    super(
      'content',
      'util',
      [],
      5000,
      'Shows the escaped content of a message',
      {
        argsRequired: true,
        argsDescription: '<messageID>',
      }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    reply(message, message.channel.messages.cache.get(args[0])?.content ?? '');
  }
}
