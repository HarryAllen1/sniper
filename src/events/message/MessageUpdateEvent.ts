// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate
import { Message } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { editSnipes } from '../../commands/util/snipes';

export default class MessageUpdateEvent extends BaseEvent {
  constructor() {
    super('messageUpdate');
  }

  async run(client: DiscordClient, oldMessage: Message, newMessage: Message) {
    if (oldMessage.partial || oldMessage.author.bot) return; // content is null

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
