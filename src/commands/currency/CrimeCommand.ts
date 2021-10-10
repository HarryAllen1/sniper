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
      'Commits a crime to gain coins. There is 50/50 chance you loose coins.',
      'you need time to plot your next crime'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.sendTyping();
    const chosenCrime = crimes[randomNumber(0, crimes.length - 1)];
    const receivedCoins = randomNumber(0 - 5000, 5000);
    const totalCoins = await getTotalCoins(message.author.id);
    const userData = await getUserData(message.author.id);
    if (userData.inJailUntil) {
      if (userData.inJailUntil > Date.now()) {
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
    } else if (totalCoins < 0 - 5000) {
      reply(message, {
        title:
          "You've finally been caught committing a crime, so you have been sent to jail.",
        description:
          'You will be in jail for 1 day which means you cant use any currency commands, but your balance will be reset to 0.',
        color: 'RED',
      });
      setUserData(
        message.author.id,
        { coins: 0, inJailUntil: Date.now() + 86400000 },
        { merge: true }
      );
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
