import { Message } from 'discord.js';
import DiscordClient from '../../client/client.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class GEndCommand extends BaseCommand {
  constructor() {
    super(
      'gEnd',
      'giveaways',
      [],
      0,
      "Ends a giveaway. You will need to obtain a message ID. If you don't know how to obtain a message ID, refer to this article: https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-",
      {
        argsRequired: true,
        argsDescription: '<message id>',
        disabled: true,
      }
    );
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.send('gEnd command works');
  }
}
