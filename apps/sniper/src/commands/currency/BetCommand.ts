import type { Message } from 'discord.js';
import type DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { getRandomNumber } from '../../utils/helpers/randomNumber.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class BetCommand extends BaseCommand {
  constructor() {
    super(
      'bet',
      'currency',
      [],
      500,
      'Gamble an amount of money, and you might earn some coins.'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0])
      return reply(message, {
        title: 'You must actually bet coins',
        color: 'RED',
      });

    const bet = parseInt(args[0]);
    if (isNaN(bet))
      return reply(message, {
        title: 'That is not a valid bet',
        color: 'RED',
        description: 'You must bet a real number',
      });

    if (bet > 1000000)
      return reply(message, {
        title: 'You cannot bet more than 1,000,000 coins',
        color: 'RED',
      });
    const userDice = getRandomNumber(1, 6);
    const botDice = getRandomNumber(1, 6);
    const win = userDice > botDice;

    await client.db.addCoins(message.author.id, win ? bet : -bet);

    await reply(message, {
      title: `You ${win ? 'won' : 'lost'} ${bet} coins.`,
      description: `You rolled a ${userDice} and Sniper rolled a ${botDice}\nYou now have ${
        (
          await client.db.get(message.author.id)
        ).coins
      } coins.`,
      color: win ? 'GREEN' : 'RED',
    });
  }
}
