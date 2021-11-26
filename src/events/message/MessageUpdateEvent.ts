// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate
import { Message, Util } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { editSnipes } from '../../commands/util/snipes';
import { log } from '../../utils/helpers/console';

export default class MessageUpdateEvent extends BaseEvent {
  constructor() {
    super('messageUpdate');
  }

  async run(client: DiscordClient, oldMessage: Message, newMessage: Message) {
    if (oldMessage.partial || oldMessage.author.bot) return; // content is null
    if (oldMessage.content !== newMessage.content) {
      if (oldMessage.guildId === '882695828140073052')
        log(
          `old message (${oldMessage.guild?.name}):\n${Util.cleanContent(
            oldMessage.content,
            oldMessage.channel
          )}\nnew message:\n${Util.cleanContent(
            newMessage.content,
            newMessage.channel
          )}`
        );
      editSnipes[oldMessage.channel.id] = {
        author: oldMessage.author,
        content: oldMessage.content,
        createdAt: newMessage.editedTimestamp,
        id: newMessage.id,
      };
    }
  }
}
