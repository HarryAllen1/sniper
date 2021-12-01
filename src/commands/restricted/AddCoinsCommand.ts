import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { addCoinsToTotal } from '../../utils/helpers/user.js';
import { reply } from '../../utils/helpers/message.js';

export default class AddCoinsCommand extends BaseCommand {
  constructor() {
    super(
      'addcoins',
      'restricted',
      [],
      0,
      'Adds any amount of coins to a user. Can only be used by bot creators.',
      { argsDescription: '<userID OR mentioned user>' }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.author.id !== '696554549418262548') return;
    if (!args[0]) {
      reply(message, { title: 'you must specify a user', color: 'RED' });
      return;
    } else if (!args[1]) {
      reply(message, {
        title: 'you must specify the coins amount',
        color: 'RED',
      });
      return;
    } else if (isNaN(parseInt(args[1]))) {
      reply(message, { title: 'thats not a number', color: 'RED' });
      return;
    }
    const targetUser = message.mentions.users.first()?.id || args[0];
    addCoinsToTotal(targetUser, parseInt(args[1])).then((coins) => {
      reply(message, {
        title: `Successfully gave ${args[1]} coins to ${targetUser}`,
        description: `They now have ${coins} coins.`,
        color: 'GREEN',
      });
    });
  }
}
