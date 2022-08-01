import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import Command from '../../utils/structures/BaseCommand.js';

export default class SayCommand extends Command {
  constructor() {
    super('say', 'general', [], 10000, 'says something');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send({
      content: `${args.join(' ')}\n\n- ${message.author.tag}`,
      allowedMentions: {
        parse: [],
      },
    });
  }
}
