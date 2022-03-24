import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { harrysDiscordID } from '../../sniper.js';

export default class SetstatusCommand extends BaseCommand {
  constructor() {
    super('setstatus', 'restricted', [], 5000, '');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id === harrysDiscordID)
      client.user?.setActivity(JSON.parse(args.join(' ')));
  }
}
