import type { Events } from '@sapphire/framework';

import { Listener } from '@sapphire/framework';
import type { SapphireClient } from '@sapphire/framework';

export default class extends Listener<typeof Events.ClientReady> {
  public async run(client: SapphireClient<true>) {
    client.logger.info(`${client.user.tag} is now up and running.`);
  }
}
