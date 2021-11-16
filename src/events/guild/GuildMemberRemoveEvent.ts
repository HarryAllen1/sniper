// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
import { GuildMember, TextChannel } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { log } from '../../utils/helpers/console';
import chalk from 'chalk';

export default class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }

  async run(client: DiscordClient, member: GuildMember) {
    if (member.user.id === '893619442712444970') {
      log(
        chalk.redBright(
          `Left server ${member.guild.name}. Now in ${client.guilds.cache.size} guilds.`
        )
      );
    }
    if (member.guild.id === '882695828140073052')
      (client.channels.cache.get('882695828140073054') as TextChannel).send({
        embeds: [
          {
            title: `${member.user.tag} has just left the server!`,
            color: 'ORANGE',
          },
        ],
      });
    else if (member.guild.id === '899035595081396255')
      (client.channels.cache.get('899035595081396258') as TextChannel).send({
        embeds: [
          {
            title: `${member.user.tag} has just left the server!`,
            color: 'ORANGE',
          },
        ],
      });
  }
}
