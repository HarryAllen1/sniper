import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { randomNumber } from '../../utils/helpers/randomNumber';
import {
  addCoinsToTotal,
  deleteFieldFromUserData,
  getTotalCoins,
  getUserData,
  setUserData,
} from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';
import { msToTime } from '../../utils/helpers/date';

const crimes = ['Bank robbery', 'J-walking', 'Stealing'];

export default class CrimeCommand extends BaseCommand {
  constructor() {
    super(
      'crime',
      'currency',
      [],
      5000,
      'Commits a crime to gain coins. There is 50/50 chance you lose coins and a 10% chance you go to jail.',
      { cooldownMessage: 'you need time to plot your next crime' }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.sendTyping();
    const chosenCrime = crimes[randomNumber(0, crimes.length - 1)];
    const receivedCoins = randomNumber(-2500, 5000);

    const userData = await getUserData(message.author.id);
    const chanceOfBeingInJail = 10; // percent
    const randNum = randomNumber(0, 100, false);

    if (userData?.inJailUntil) {
      if (userData?.inJailUntil > Date.now()) {
        reply(message, {
          title: 'You are still in jail!',
          color: 'RED',
          description: `You will be released in ${msToTime(
            userData.inJailUntil - Date.now()
          )} You cannot use most currency commands until you have been released. `,
        });
      } else {
        deleteFieldFromUserData(message.author.id, ['inJailUntil']);
        addCoinsToTotal(message.author.id, receivedCoins).then((val) => {
          reply(message, {
            title: `You committed ${chosenCrime}`,
            description: `You ${
              receivedCoins >= 0 ? 'gained' : 'lost'
            } ${receivedCoins}`,
            fields: [
              {
                name: 'Your total coins:',
                value: (val as number).toString(),
              },
            ],
            color: receivedCoins >= 0 ? 'GREEN' : 'RED',
          });
        });
      }
    } else if (randNum <= chanceOfBeingInJail) {
      reply(message, {
        title:
          "You've finally been caught committing a crime, so you have been sent to jail.",
        description:
          'You will be in jail for 1 hour which means you cant use any currency commands.',
        color: 'RED',
      });
      setUserData(
        message.author.id,
        { inJailUntil: Date.now() + 3600000 },
        { merge: true }
      );
    } else if (receivedCoins > 0 - 1000 && receivedCoins < 1000) {
      getTotalCoins(message.author.id).then((coins) => {
        reply(message, {
          title: `You got caught ${chosenCrime}`,
          description:
            "However, you managed to run away before you were caught. You didn't gain any coins.",
          color: 'ORANGE',
          fields: [{ name: 'Your total coins:', value: coins.toString() }],
        });
      });
    } else
      addCoinsToTotal(message.author.id, receivedCoins).then((val) => {
        reply(message, {
          title: `You committed ${chosenCrime}`,
          description: `You ${
            receivedCoins >= 0 ? 'gained' : 'lost'
          } ${receivedCoins}`,
          fields: [
            {
              name: 'Your total coins:',
              value: (val as number).toString(),
            },
          ],
          color: receivedCoins >= 0 ? 'GREEN' : 'RED',
        });
      });
  }
}
