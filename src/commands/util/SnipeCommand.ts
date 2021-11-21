import { Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { snipes, unSnipes } from './snipes';
import { reply } from '../../utils/helpers/reply';

export default class SnipeCommand extends BaseCommand {
  constructor() {
    super('snipe', 'util', [], 1000, 'Shows the last deleted message.');
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
            : { title: "There's nothing to snipe!" },
          {
            files: [
              {
                attachment: channelSnipe.attachment || '',
                name: 'image',
              },
            ],
          }
        );
      else {
        await reply(message, {
          title: "That channel doesn't exist",
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
      {}
    ).then((msg) => {
      unSnipes[message.channel.id] = {
        msg,
      };
    });
  }
}
