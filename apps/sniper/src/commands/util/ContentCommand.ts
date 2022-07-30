import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { Command } from '../../utils/structures/BaseCommand.js';

export default class ContentCommand extends Command {
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
    reply(
      message,
      `\`\`\`\n${message.channel.messages.cache
        .get(args[0])
        ?.content.replaceAll('`', '\\`')}\n\`\`\`` ?? '(no content)'
    );
  }
}
