// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';
import DiscordClient from '../../client/client.js';
import { sendMessageInBorderSecurity } from '../../utils/helpers/cambridge-server.js';
import { log } from '../../utils/helpers/console.js';
import chalk from 'chalk';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: GuildMember) {
    if (member.user.id === '893619442712444970') {
      log(
        chalk.greenBright(
          `Joined server ${member.guild.name}. Now in ${client.guilds.cache.size} guilds.`
        )
      );
    }
    if (member.user.id === '529193628569042946') {
      member.ban({ reason: 'e' });
    }
    // const invites = await member.guild.invites.fetch();
    // console.log(invites);
    if (member.guild.id === '882695828140073052') {
      const channel = client.channels.cache.get('891408397570818098');

      if (channel?.isVoice()) {
        channel.setName(`👥 members: ${channel.guild.memberCount}`);
      }
    }
    setTimeout(() => {
      if (member.guild.id === '882695828140073052' && !member.user.bot)
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
