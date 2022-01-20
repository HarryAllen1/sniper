import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';

export default class SudoCommand extends BaseCommand {
  constructor() {
    super('sudo', 'restricted', [], 0, 'Run a command as another user', {
      argsRequired: true,
      argsDescription: '<userID> <command> [...args]',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.author = await client.users.fetch(args[0]);

    client.commands.get(args[1])?.run(client, message, args.slice(2));
  }
}
