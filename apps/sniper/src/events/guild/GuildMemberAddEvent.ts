import { GuildMember, VoiceChannel } from 'discord.js';
import DiscordClient from '../../client/client.js';
import { sendMessageInBorderSecurity } from '../../utils/helpers/cambridge-server.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: GuildMember) {
    if (member.guild.id === '882695828140073052') {
      (client.channels.cache.get('891408397570818098') as VoiceChannel).setName(
        '👥 members: ' + member.guild.memberCount
      );
    }
    setTimeout(() => {
      if (member.guild.id === '882695828140073052' && !member.user.bot)
        sendMessageInBorderSecurity(client, {
          embeds: [
            {
              title:
                "This server is for people in the Cambridge Program only. If you don't know what that is, you probably aren't in it.\n\nAlso, please state either your name in this channel.",
              description:
                '[More info on the cambridge program](https://jhs.lwsd.org/academics/cambridge-program)',
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
