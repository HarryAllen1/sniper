// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { setDefaultGuildSettings, setGuildData } from '../../utils/helpers/fb';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: GuildMember) {
    if (member.user.id === '893619442712444970') {
      setDefaultGuildSettings(member.guild.id);
    }
  }
}
