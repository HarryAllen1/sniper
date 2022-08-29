// ensure commadn exists

import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import Command from '../../utils/structures/BaseCommand.js';

export default class SudoCommand extends Command {
  constructor() {
    super('sudo', 'restricted', [], 0, 'Run a command as another user', {
      argsRequired: true,
      argsDescription: '<userID> <command> [...args]',
    });
  }

  async run(
    client: DiscordClient,
    message: Message<true>,
    args: Array<string>
  ) {
    message.author =
      args[0].startsWith('<@') && args[0].endsWith('>')
        ? await client.users.fetch(args[0].substring(2).slice(0, -1))
        : await client.users.fetch(args[0]);

    const cmd = client.commands.get(args[1])?.run;
    if (!cmd) return message.reply('Not a command');

    cmd(client, message, args.slice(2));
  }
}
