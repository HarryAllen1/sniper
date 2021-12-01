import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { getTotalCoins } from '../../utils/helpers/user.js';
import { reply } from '../../utils/helpers/message.js';
import { getMentionedUser } from '../../utils/helpers/mention.js';

export default class BalanceCommand extends BaseCommand {
  constructor() {
    super(
      'balance',
      'currency',
      ['bal'],
      1000,
      'Shows the current amount of coins you have.',
      { argsDescription: '[mentioned user OR user ID]' }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.sendTyping();
    const user = getMentionedUser(message, args);

    if (args[0]) {
      const mentionedUser = getMentionedUser(message, args);
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
      getTotalCoins(user.id).then((coins) => {
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
  }
}
