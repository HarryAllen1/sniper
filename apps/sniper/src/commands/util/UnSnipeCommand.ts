import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { snipes, unSnipes } from './snipes.js';
import { reply } from '../../utils/helpers/message.js';

export default class UnSnipeCommand extends BaseCommand {
  constructor() {
    super(
      'unsnipe',
      'util',
      [],
      1000,
      'The author of the sniped message can delete the snipe with this command.'
    );
  }

  async run(client: DiscordClient, message: Message) {
    const snipe = unSnipes[message.channelId]?.msg;
    if (!snipe) {
      reply(message, {
        title:
          'This snipe does not exist. This usually happens after a bot restart.',
        color: 'RED',
      });
      return;
    }
    const msgToDelete = message.channel?.messages.cache.get(snipe?.id);
    if (
      msgToDelete &&
      snipe &&
      message.author.id === snipes[message.channel.id].author?.id
    ) {
      await msgToDelete.delete();
      delete snipes[message.channel.id];
    }
  }
}
