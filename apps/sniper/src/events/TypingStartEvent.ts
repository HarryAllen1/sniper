import type { Typing } from 'discord.js';
import type { DiscordClient } from '../client/client.js';
import { users } from '../commands/general/annoy.js';
import { BaseEvent } from '../utils/structures/BaseEvent.js';

export default class TypingStartEvent extends BaseEvent {
  constructor() {
    super('typingStart');
  }

  async run(client: DiscordClient, typing: Typing) {
    if (users.includes(typing.user.id))
      typing.channel.send(typing.user.toString());
  }
}
