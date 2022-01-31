import { Message } from 'discord.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { getUserData, setUserData } from '../../utils/helpers/user.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class GiveCommand extends BaseCommand {
  constructor() {
    super(
      'give',
      'currency',
      [],
      5000,
      'Gives some coins to a specified user',
      { argsDescription: '<user ID or mentioned user> <amount of coins>' }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      reply(message, {
        title: 'Please specify a user to give coins to.',
        color: 'RED',
      });
      return;
    }
    const mentionedUser =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]) ||
      message.guild?.members.cache.find(
        (member) => member.user.username.toLowerCase() === args[0].toLowerCase()
      );
    if (mentionedUser === message.member) {
      reply(message, {
        title: "You can't give coins to yourself.",
        description: 'seems like common sense tbh',
        color: 'RED',
      });
      return;
    }
    if (!mentionedUser) {
      reply(message, {
        title: 'Please specify a valid user to give coins to.',
        color: 'RED',
      });
    } else {
      const amount = parseInt(args[1]);

      if (isNaN(amount)) {
        reply(message, {
          title: 'Please specify a valid amount of coins to give.',
          color: 'RED',
        });
      } else {
        if (amount <= 0) {
          reply(message, {
            title: 'the amount of coins must be positive lol',
            color: 'RED',
          });
          return;
        }
        const userData = await getUserData(message.author.id);
        const recipient = await getUserData(mentionedUser.id);
        if (recipient) {
          if (userData.coins < amount) {
            reply(message, {
              title: 'You do not have enough coins to give.',
              color: 'RED',
            });
            return;
          }
          recipient.coins += amount;
          userData.coins -= amount;
          setUserData(
            mentionedUser.id,
            { coins: recipient.coins },
            { merge: true }
          );
          setUserData(
            message.author.id,
            { coins: userData.coins },
            { merge: true }
          );
          reply(message, {
            title: `Successfully gave ${amount} coins to ${mentionedUser.nickname}`,
            description: `${mentionedUser.nickname} now has ${recipient.coins} coins.`,
            color: 'GREEN',
          });
        } else {
          reply(message, {
            title: 'An error occurred while giving coins.',
            description:
              'This is generally caused by the recipient not ever using the bot. Please try again later.',
            color: 'RED',
          });
        }
      }
    }
  }
}
