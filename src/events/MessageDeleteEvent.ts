// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete
import { Message } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { snipes } from '../commands/util/snipes';

export default class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super('messageDelete');
  }

  async run(client: DiscordClient, message: Message) {
    if (message.partial || message.author.id === '893619442712444970') return; // content is null
    console.log(message.guild!.name + ': ' + message.content);
    snipes[message.channel.id] = {
      author: message.author,
      content: message.content,
      createdAt: message.createdTimestamp,
    };
  }
}
