import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, SapphireClient } from '@sapphire/framework';
import { ActivityType } from 'discord.js';

@ApplyOptions<Listener.Options>({
  event: Events.ClientReady,
})
export class UserEvent extends Listener<typeof Events.ClientReady> {
  public run(client: SapphireClient<true>) {
    client.logger.info(
      `${client.user.tag} is ready in ${client.guilds.cache.size} guilds`
    );
    client.user.setActivity({
      name: `for deleted messages in ${client.guilds.cache.size} servers`,
      type: ActivityType.Watching,
    });
  }
}
