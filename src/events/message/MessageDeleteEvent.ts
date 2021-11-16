// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete
import { Message, Util } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { snipes, setSnipe, Snipe } from '../../commands/util/snipes';
import { log } from '../../utils/helpers/console';

export default class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super('messageDelete');
  }

  async run(client: DiscordClient, message: Message) {
    if (message.partial || message.author.bot) return; // content is null
    if (message.content.toLowerCase() !== '.pick')
      log(
        message.guild!.name +
          ': ' +
          Util.cleanContent(message.content, message.channel)
      );

    snipes[message.channel.id] = {
      author: message.author,
      content: message.content,
      createdAt: message.createdTimestamp,
      attachment: message.attachments.first()?.url,
    };
    const snipeContent: any = {};
    snipeContent[message.channel.id] = {
      author: message.author.id,
      content: message.content,
      createdAt: message.createdTimestamp,
      // attachment: message.attachments.first()?.url,
    };
    setSnipe(snipeContent);
  }
}
