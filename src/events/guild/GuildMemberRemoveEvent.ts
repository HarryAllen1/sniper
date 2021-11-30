// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
import { GuildMember, TextChannel } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';
import DiscordClient from '../../client/client.js';
import { sendMessageInBorderSecurity } from '../../utils/helpers/cambridge-server.js';

export default class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }

  async run(client: DiscordClient, member: GuildMember) {
    if (member.guild.id === '882695828140073052') {
      const fetchedLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK',
      });
      const kickLog = fetchedLogs.entries.first();
      if (!kickLog) {
        sendMessageInBorderSecurity(client, {
          embeds: [
            {
              title: `${member.user.tag} has just left the server!`,
              color: 'ORANGE',
            },
          ],
        });
        return;
      }
      const { executor, target: t } = kickLog;
      const target = t as GuildMember;
      if (target?.id && target.id === member.id) {
        (client.channels.cache.get('882695828140073054') as TextChannel).send({
          embeds: [
            {
              title: `${member.user.tag} was just kicked by ${executor?.tag}!`,
              color: 'ORANGE',
            },
          ],
        });
      } else {
        sendMessageInBorderSecurity(client, {
          embeds: [
            {
              title: `${member.user.tag} has just left the server!`,
              color: 'ORANGE',
            },
          ],
        });
      }
    }
    // michael
    else if (member.guild.id === '899035595081396255')
      (client.channels.cache.get('909122555229642802') as TextChannel).send({
        embeds: [
          {
            title: `${member.user.tag} has just left the server!`,
            color: 'ORANGE',
          },
        ],
      });
  }
}
