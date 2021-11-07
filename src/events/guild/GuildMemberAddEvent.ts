// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { setDefaultGuildSettings } from '../../utils/helpers/fb';
import { sendMessageInBorderSecurity } from '../../utils/helpers/cambridge-server';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: GuildMember) {
    if (member.user.id === '893619442712444970') {
      setDefaultGuildSettings(member.guild.id);
    }
    if (member.user.id === '529193628569042946') {
      member.ban({ reason: 'fuck you' });
    }
    // const invites = await member.guild.invites.fetch();
    // console.log(invites);
    setTimeout(() => {
      if (member.guild.id === '882695828140073052')
        sendMessageInBorderSecurity(client, {
          embeds: [
            {
              title:
                "This server is for people in the Cambridge Program only. If you don't know what that is, you probably aren't in it.",
              description:
                'More info on the cambridge program: https://jhs.lwsd.org/academics/cambridge-program',
              color: 'RED',
              footer: {
                text: `Invited by ${''}`,
              },
            },
          ],
        });
    }, 100);
  }
}
