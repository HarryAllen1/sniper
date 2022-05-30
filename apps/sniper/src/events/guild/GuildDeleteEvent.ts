import { redBright } from 'colorette';
import type { Guild } from 'discord.js';
import type DiscordClient from '../../client/client.js';
import { harrysDiscordID } from '../../sniper.js';
import { log } from '../../utils/helpers/console.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';

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
      redBright(
        `Left server ${guild.name}. Now in ${client.guilds.cache.size} guilds.`
      )
    );
    const owner = await guild
      .fetchOwner({ force: true })
      .catch(() => console.log('cant fetch guild owner'));

    client.users.cache.get(harrysDiscordID)?.send({
      content: `(-) Now in ${client.guilds.cache.size} guilds.`,
      embeds: [
        {
          title: 'Removed from Guild',
          description: [
            `**Guild Name:** ${guild.name}`,
            `**Guild ID:** ${guild.id}`,
            `**Guild Owner:** ${owner?.user.tag}`,
            `**Guild Member Count:** ${guild.memberCount?.toLocaleString()}`,
          ].join('\n'),
          image: {
            url:
              guild.iconURL({ dynamic: true, size: 1024 }) ??
              owner?.user.avatarURL({ dynamic: true, size: 1024 }) ??
              owner?.user.defaultAvatarURL,
          },
        },
      ],
    });
  }
}
