import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, ListenerOptions } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: Events.GuildBanAdd,
})
export default class extends Listener<typeof Events.GuildBanAdd> {
  public run(...args: unknown[]) {
    console.log(args);
  }
}
