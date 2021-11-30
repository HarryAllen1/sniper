// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove
import { MessageReaction, User } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';
import DiscordClient from '../../client/client.js';
import { reactionSnipes } from '../../commands/util/snipes.js';

export default class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }

  async run(client: DiscordClient, reaction: MessageReaction, user: User) {
    if (reaction.partial || user.bot) return;
    reaction = await reaction.fetch();

    reactionSnipes[reaction.message.channel.id] = {
      user,
      emoji: reaction.emoji,
      messageURL: reaction.message.url,
      createdAt: Date.now(),
    };
  }
}
