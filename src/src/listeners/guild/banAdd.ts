import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, ListenerOptions } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: Events.GuildBanAdd,
})
export default class extends Listener<typeof Events.GuildBanAdd> {
  public async run(...args: any[]) {
    console.log(args);
  }
}
