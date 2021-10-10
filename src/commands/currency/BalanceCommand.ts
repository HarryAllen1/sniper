import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getTotalCoins } from '../../utils/user';
import { reply } from '../../utils/reply';

export default class BalanceCommand extends BaseCommand {
  constructor() {
    super(
      'balance',
      'currency',
      ['bal'],
      1000,
      'Shows the current amount of coins you (or someone you mention) have.'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.sendTyping();
    if (!message.mentions.users.first()) {
      if (args[0] && client.users.cache.get(args[0])) {
        const mentionedUser = client.users.cache.get(args[0])!;
        getTotalCoins(mentionedUser.id).then((coins) => {
          reply(message, {
            title: `${mentionedUser.tag}'s balance`,
            thumbnail: {
              url: mentionedUser.displayAvatarURL({
                dynamic: true,
                format: `webp`,
              }),
            },

            description: `${coins} coins`,
            timestamp: Date.now(),
          });
        });
      } else {
        getTotalCoins(message.author.id).then((coins) => {
          reply(message, {
            title: `${message.author.tag}'s balance`,
            thumbnail: {
              url: message.author.displayAvatarURL({
                dynamic: true,
                format: `webp`,
              }),
            },

            description: `${coins} coins`,
            timestamp: Date.now(),
          });
        });
      }
    } else {
      const firstMention = message.mentions.users.first()!;
      getTotalCoins(firstMention.id).then((coins) => {
        reply(message, {
          title: `${firstMention.tag}'s balance`,
          thumbnail: {
            url: firstMention.displayAvatarURL({
              dynamic: true,
              format: `webp`,
            }),
          },

          description: `${coins} coins`,
          timestamp: Date.now(),
        });
      });
    }
  }
}
