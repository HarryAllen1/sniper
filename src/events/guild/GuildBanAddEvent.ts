// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildBanAdd
import { GuildBan } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { sendMessageInBorderSecurity } from '../../utils/helpers/cambridge-server';

export default class GuildBanAddEvent extends BaseEvent {
  constructor() {
    super('guildBanAdd');
  }

  async run(client: DiscordClient, ban: GuildBan) {
    if (ban.guild.id !== '882695828140073052') return;
    sendMessageInBorderSecurity(client, {
      embeds: [
        {
          title: `${ban.user.tag} was banned`,
          description: `Reason: ${ban.reason ? ban.reason : 'No reason given'}`,
          color: 'RED',
        },
      ],
    });
  }
}
