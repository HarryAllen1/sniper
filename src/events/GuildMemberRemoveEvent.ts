// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
import { GuildMember, TextChannel } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

export default class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }

  async run(client: DiscordClient, member: GuildMember) {
    if (member.guild.id !== '882695828140073052') return;
    (client.channels.cache.get('882695828140073054') as TextChannel).send({
      embeds: [
        {
          title: `${member.user.tag} has just left the server!`,
          color: 'ORANGE',
        },
      ],
    });
  }
}
