import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import { reactionSnipes } from '../util/snipes';
import DiscordClient from '../../client/client';

import { reply } from '../../utils/helpers/reply';

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
        const userImport = await import('../../utils/helpers/user');
        const addCoinsToTotal = userImport.addCoinsToTotal;
        const getTotalCoins = userImport.getTotalCoins;
        const setTotalCoins = userImport.setTotalCoins;
        const snipes = await import('../util/snipes');

        eval(message.content.substring(6));
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
