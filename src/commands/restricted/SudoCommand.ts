import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';

export default class SudoCommand extends BaseCommand {
  constructor() {
    super('sudo', 'restricted', [], 0, '', {
      argsRequired: true,
      argsDescription: '<userID> <command> [...args]',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.author === client.users.cache.get(args[0]);
    message.member === message.guild?.members.cache.get(args[0]);
    client.commands.get(args[1])?.run(client, message, args.slice(2));
  }
}
