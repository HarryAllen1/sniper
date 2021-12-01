import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';

import { reply } from '../../utils/helpers/message.js';

export default class EvalCommand extends BaseCommand {
  constructor() {
    super(
      'eval',
      'restricted',
      [],
      0,
      'Executes Javascript code. Can only be used by the owner(s) of the bot.'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id === '696554549418262548') {
      try {
        const userImport = await import('../../utils/helpers/user.js');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
        const addCoinsToTotal = userImport.addCoinsToTotal;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
        const getTotalCoins = userImport.getTotalCoins;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
        const setTotalCoins = userImport.setTotalCoins;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- its for the eval; it wont be used until the command is actually used and whatnot idk
        const snipes = await import('../util/snipes.js');

        eval(args.join(' '));
        reply(message, { title: 'success', color: 'GREEN' }).then((msg) =>
          setTimeout(() => msg.delete(), 3000)
        );
      } catch (err) {
        reply(message, {
          title: 'you messed up your code:\n' + err,
          color: 'RED',
        });
      }
    } else {
      reply(message, {
        title: "You can't use this command.",
        description:
          'This command is so dangerous (it could literally wipe all files of the server this bot is running on) that only the creator of the bot can use it.',
        color: 'RED',
      });
    }
  }
}
