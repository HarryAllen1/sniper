// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanAdd
import { GuildBan, User } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { sendMessageInBorderSecurity } from '../../utils/helpers/cambridge-server';

export default class GuildBanAddEvent extends BaseEvent {
  constructor() {
    super('guildBanAdd');
  }

  async run(client: DiscordClient, ban: GuildBan) {
    if (ban.guild.id !== '882695828140073052') return;
    const fetchedLogs = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_BAN_ADD',
    });
    const banLog = fetchedLogs.entries.first();

    if (!banLog) {
      sendMessageInBorderSecurity(client, {
        embeds: [
          {
            title: `${ban.user.tag} was banned`,
            description: `Reason: ${
              ban.reason ? ban.reason : 'No reason given'
            }`,
            color: 'RED',
          },
        ],
      });
      return;
    }
    const { executor, target } = banLog;
    if ((target as User).id && (target as User).id === ban.user.id) {
      sendMessageInBorderSecurity(client, {
        embeds: [
          {
            title: `${ban.user.tag} was banned`,
            description: `Reason: ${
              ban.reason ? ban.reason : 'No reason given'
            }\nExecutor: ${executor!.tag}`,
            color: 'RED',
          },
        ],
      });
    } else {
      sendMessageInBorderSecurity(client, {
        embeds: [
          {
            title: `${ban.user.tag} was banned`,
            description: `Reason: ${
              ban.reason ? ban.reason : 'No reason given'
            }`,
            color: 'RED',
          },
        ],
      });
    }
  }
}
