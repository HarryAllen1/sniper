import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client: DiscordClient) {
    console.log(`[sniper] :: Logged in as ${client.user?.tag}.`);
    client.user?.setActivity({
      name: 'deleted messages',
      type: 'WATCHING',
    });
  }
}
