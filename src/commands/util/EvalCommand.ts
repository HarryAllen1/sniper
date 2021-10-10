import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { addCoinsToTotal, getTotalCoins } from '../../utils/user';

export default class EvalCommand extends BaseCommand {
  constructor() {
    super(
      'eval',
      'util',
      [],
      0,
      'Executes Javascript code. Can only be used by the owner(s) of the bot.'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id === '696554549418262548') {
      try {
        const evalAddCoinsToTotal = addCoinsToTotal;
        const evalGetTotalCoins = getTotalCoins;

        eval(message.content.substring(7));
        message.reply('success');
      } catch (err) {
        message.reply('you messed up your code:\n' + err);
      }
    } else {
      message.reply({
        embeds: [
          {
            title: "You can't use this command.",
            description:
              'This command is so dangerous (it could literally wipe all files of the server this bot is running on) that only the creator of the bot can use it.',
          },
        ],
      });
    }
  }
}
