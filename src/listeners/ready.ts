import { Events, Listener, SapphireClient } from '@sapphire/framework';

export default class extends Listener<typeof Events.ClientReady> {
  public run(client: SapphireClient<true>) {
    client.logger.info(`${client.user.tag} is now up and running.`);
  }
}
