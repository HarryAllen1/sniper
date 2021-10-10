// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove
import { MessageReaction, User } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { reactionSnipes } from '../commands/util/snipes';

export default class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }

  async run(client: DiscordClient, reaction: MessageReaction, user: User) {
    if (reaction.partial) reaction = await reaction.fetch();

    reactionSnipes[reaction.message.channel.id] = {
      user,
      emoji: reaction.emoji,
      messageURL: reaction.message.url,
      createdAt: Date.now(),
    };
  }
}
