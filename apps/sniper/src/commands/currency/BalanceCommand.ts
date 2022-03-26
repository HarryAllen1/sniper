import { SlashCommandBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';
import DiscordClient from '../../client/client.js';
import { getMentionedUser } from '../../utils/helpers/mention.js';
import { reply } from '../../utils/helpers/message.js';
import { getTotalCoins } from '../../utils/helpers/user.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';

export default class BalanceCommand extends BaseCommand {
  constructor() {
    super(
      'balance',
      'currency',
      ['bal'],
      1000,
      'Shows the current amount of coins you or someone else has.',
      {
        argsDescription: '[mentioned user OR user ID]',
        // slashCommandType: ApplicationCommandType.User,
      }
    );
  }
  interactionData = new SlashCommandBuilder()
    .setName('balance')
    .setDescription(
      'Shows the current amount of coins you or someone else has.'
    )
    .addUserOption((usr) =>
      usr
        .setName('user')
        .setRequired(false)
        .setDescription('User to get balance of')
    );

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.guild?.members.cache.forEach((member) => {
      member.roles.cache.forEach((r) => {
        if (r.id === '888556041321721917') {
          member.roles.remove('888556041321721917');
          member.roles.add('957131711077031946');
        }
      });
    });
    message.channel.sendTyping();
    const user = getMentionedUser(message, args);

    if (args[0]) {
      const mentionedUser = getMentionedUser(message, args);
      client.db.getCoins(mentionedUser.id).then((coins) => {
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
