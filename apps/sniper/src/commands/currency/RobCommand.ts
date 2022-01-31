import { Message, User } from 'discord.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import randomNumber from '../../utils/helpers/randomNumber.js';
import { getUserData, setUserData } from '../../utils/helpers/user.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class RobCommand extends BaseCommand {
  constructor() {
    super('rob', 'currency', [], 60000, '(try) to rob someone!', {
      argsDescription: '<user ID or mentioned user to rob>',
      cooldownMessage: 'You need time to recover!',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, {
        title: 'You need to specify a user to rob',
        description: 'dumb',
        color: 'RED',
      });
      return;
    }

    const mentionedUser: User | null =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      client.users.cache.find(
        (u) => u.username.toLowerCase() === args[0].toLowerCase()
      ) ||
      message.guild?.members.cache.find(
        (u) => u.user.username.toLowerCase() === args[0].toLowerCase()
      )?.user ||
      null;

    if (!mentionedUser) {
      reply(message, {
        title: 'User not found',
        description: 'Try mentioning the user.',
        color: 'RED',
      });
      return;
    }

    if (mentionedUser.id === message.author.id) {
      reply(message, {
        title: 'You cannot rob yourself',
        description: 'why',
        color: 'RED',
      });
      return;
    }

    const user = await getUserData(message.author.id);
    const robbedUser = await getUserData(mentionedUser.id);

    if (!robbedUser) {
      reply(message, {
        title: 'User not found',
        description:
          "It seems this user isn't in the bots cache. Get them to use a command first.",
        color: 'RED',
      });
      return;
    }

    if (user?.coins < 500) {
      reply(message, {
        title: 'You need at least 500 coins to rob someone',
        description: 'idk why tbh',
        color: 'RED',
      });
      return;
    }
    if (robbedUser?.coins < 500) {
      reply(message, {
        title: 'They need at least 500 coins to rob someone',
        description: "they're poor; don't rob poor people please",
        color: 'RED',
      });
      return;
    }

    const chance = randomNumber(1, 100);
    if (chance > 50) {
      const maxRobbableCoins = robbedUser.coins * 0.4;
      const minRobbableCoins = robbedUser.coins * 0.1;
      const robbedCoins = randomNumber(minRobbableCoins, maxRobbableCoins);
      user.coins += robbedCoins;
      robbedUser.coins -= robbedCoins;
      reply(message, {
        title: 'You successfully robbed them',
        description: `You gained ${robbedCoins} coins.`,
        color: 'GREEN',
      });
      mentionedUser.send({
        embeds: [
          {
            title: 'You were robbed!',
            description: `You lost ${robbedCoins} coins.`,
            color: 'RED',
          },
        ],
      });
      setUserData(message.author.id, user);
      setUserData(mentionedUser.id, robbedUser);
    } else {
      user.coins -= 500;
      reply(message, {
        title: 'You failed lol',
        description: 'they were too quick',
        color: 'RED',
      });
    }
  }
}
