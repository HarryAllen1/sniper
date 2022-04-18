// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-typingStart
import { Typing } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent.js';
import DiscordClient from '../client/client.js';
import { users } from '../commands/general/annoy.js';

export default class TypingStartEvent extends BaseEvent {
  constructor() {
    super('typingStart');
  }

  async run(client: DiscordClient, typing: Typing) {
    if (users.includes(typing.user.id))
      typing.channel.send(typing.user.toString());
  }
}
