// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
import { Guild } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';
import DiscordClient from '../../client/client.js';
import { log } from '../../utils/helpers/console.js';
import chalk from 'chalk';
import { harrysDiscordID } from '../../sniper.js';

export default class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }

  async run(client: DiscordClient, guild: Guild) {
    client.user?.setActivity({
      name: `$help in ${client.guilds.cache.size} servers`,
      type: 'WATCHING',
    });
    log(
      chalk.redBright(
        `Left server ${guild.name}. Now in ${client.guilds.cache.size} guilds.`
      )
    );
    const owner = await guild.fetchOwner({ force: true });

    client.users.cache.get(harrysDiscordID)?.send({
      content: `Now in ${client.guilds.cache.size} guilds.`,
      embeds: [
        {
          title: 'Removed from Guild',
          description: [
            `**Guild Name:** ${guild.name}`,
            `**Guild ID:** ${guild.id}`,
            `**Guild Owner:** ${owner.user.tag} [<@${owner.user.id}>]`,
            `**Guild Member Count:** ${guild.memberCount.toLocaleString()}`,
          ].join('\n'),
          image: {
            url:
              guild.iconURL({ dynamic: true, size: 1024 }) ??
              owner.user.avatarURL({ dynamic: true, size: 1024 }) ??
              owner.user.defaultAvatarURL,
          },
        },
      ],
    });
  }
}
