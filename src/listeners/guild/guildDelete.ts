import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener } from '@sapphire/framework';
import { redBright } from 'colorette';
import { ActivityType, Guild } from 'discord.js';
import { harrysDiscordID } from '../../index.js';

@ApplyOptions<Listener.Options>({ event: Events.GuildDelete })
export class GuildDelete extends Listener<typeof Events.GuildDelete> {
  public async run(guild: Guild) {
    this.container.client.user?.setActivity({
      name: `for deleted messages in ${this.container.client.guilds.cache.size} servers`,
      type: ActivityType.Watching,
    });
    this.container.logger.info(
      redBright(
        `Left server ${guild.name}. Now in ${this.container.client.guilds.cache.size} guilds.`
      )
    );
    const owner = await guild
      .fetchOwner({ force: true })
      .catch(() => console.log('cant fetch guild owner'));

    await this.container.client.users.cache.get(harrysDiscordID)?.send({
      content: `(-) Now in ${this.container.client.guilds.cache.size} guilds.`,
      embeds: [
        {
          title: 'Removed from Guild',
          description: [
            `**Guild Name:** ${guild.name}`,
            `**Guild ID:** ${guild.id}`,
            `**Guild Owner:** ${owner?.user.tag}`,
            `**Guild Member Count:** ${guild.memberCount?.toLocaleString()}`,
          ].join('\n'),
        },
      ],
    });
  }
}
