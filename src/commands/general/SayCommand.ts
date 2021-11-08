import { Message, Util } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class SayCommand extends BaseCommand {
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
