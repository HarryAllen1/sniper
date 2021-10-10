// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate
import { Message } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { editSnipes } from '../commands/util/snipes';

export default class MessageUodateEvent extends BaseEvent {
  constructor() {
    super('messageUpdate');
  }

  async run(client: DiscordClient, oldMessage: Message, newMessage: Message) {
    if (oldMessage.partial) return; // content is null
    if (
      oldMessage.author.id !== '270904126974590976' &&
      oldMessage.author.id !== '893619442712444970'
    )
      console.log(
        `old message (${
          oldMessage.guild!.name
        }):\n${oldMessage}\nnew message:\n${newMessage}`
      );
    editSnipes[oldMessage.channel.id] = {
      author: oldMessage.author,
      content: oldMessage.content,
      createdAt: newMessage.editedTimestamp,
      id: newMessage.id,
    };
  }
}
