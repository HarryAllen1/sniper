import { Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { snipes, unSnipes } from './snipes.js';
import { reply } from '../../utils/helpers/reply.js';

export default class SnipeCommand extends BaseCommand {
  constructor() {
    super('snipe', 'util', [], 1000, 'Shows the last deleted message.', {
      argsDescription: '[mentioned channel]',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const snipe = snipes[message.channel.id];
    if (args[0] && message.mentions.channels.first()) {
      const channelSnipe = snipes[message.mentions.channels.first()?.id ?? ''];
      if (channelSnipe)
        await reply(
          message,
          channelSnipe
            ? new MessageEmbed()
                .setDescription(
                  `${
                    message.author.bot
                      ? "(if there is nothing here, the message was probably an embed and i can't send embeds in embeds)\n"
                      : ''
                  }${channelSnipe.content}`
                )
                .setAuthor(channelSnipe.author?.tag ?? '')
                .setColor('GREEN')
                .setFooter(`#${(message.channel as TextChannel).name}`)
                .setTimestamp(
                  channelSnipe.createdAt ? channelSnipe.createdAt : 0
                )
            : { title: "There's nothing to snipe!" }
        );
      else {
        await reply(message, {
          title:
            "That channel doesn't exist, or I don't have permission to view that channel.",
          color: 'RED',
        });
      }
      return;
    }
    await reply(
      message,
      snipe
        ? new MessageEmbed()
            .setDescription(
              `${
                message.author.bot
                  ? "(if there is nothing here, the message was probably an embed and i can't send embeds in embeds)\n"
                  : ''
              }${snipe.content}`
            )
            .setAuthor(snipe.author?.tag ?? '')
            .setColor('GREEN')
            .setFooter(`#${(message.channel as TextChannel).name}`)
            .setTimestamp(snipe.createdAt ? snipe.createdAt : 0)
        : { title: "There's nothing to snipe!" },

      // snipe?.message?.attachments.first()
      //   ? {
      //       attachments: snipe.message.attachments.toJSON(),
      //     }
      //   :
      {}
    ).then((msg) => {
      unSnipes[message.channel.id] = {
        msg,
      };
    });
  }
}
