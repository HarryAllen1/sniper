// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove
import { GuildMember, MessageReaction, TextChannel, User } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';
import DiscordClient from '../../client/client.js';
import { reactionSnipes } from '../../commands/util/snipes.js';
import { sleep } from '../../utils/helpers/misc.js';
import ms from 'ms';

export default class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }

  async run(client: DiscordClient, reaction: MessageReaction, user: User) {
    if (reaction.partial || user.bot) return;
    // this causes errors sometimes; idk why (missing access?????)
    const idk = reaction.fetch();
    // so just catch the error to prevent bot crash.
    idk.catch(() => null);
    if (
      (reaction.message.channel as TextChannel)
        .permissionsFor(reaction.message.guild?.me as GuildMember)
        .has('READ_MESSAGE_HISTORY')
    )
      reaction = await idk;

    reactionSnipes[reaction.message.channel.id] = {
      user,
      emoji: reaction.emoji,
      messageURL: reaction.message.url,
      createdAt: reaction.message.createdTimestamp,
    };
    await sleep(ms('5m'));

    if (
      reactionSnipes[reaction.message.channel.id]?.createdAt ===
      reaction.message.createdTimestamp
    ) {
      delete reactionSnipes[reaction.message.channel.id];
    }
  }
}
