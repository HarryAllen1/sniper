import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { log } from '../../utils/helpers/console';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client: DiscordClient) {
    log(`Logged in as ${client.user?.tag}.`);
    client.user?.setActivity({
      name: 'deleted messages',
      type: 'WATCHING',
    });
  }
}
