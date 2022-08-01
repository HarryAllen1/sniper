import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { harrysDiscordID } from '../../sniper.js';
import Command from '../../utils/structures/BaseCommand.js';

export default class SetstatusCommand extends Command {
  constructor() {
    super('setstatus', 'restricted', [], 5000, '');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id === harrysDiscordID)
      client.user?.setActivity(JSON.parse(args.join(' ')));
  }
}
