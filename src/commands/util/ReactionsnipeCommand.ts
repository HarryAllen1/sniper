import { GuildEmoji, Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { reactionSnipes, UniversalEmoji } from './snipes.js';
import { reply } from '../../utils/helpers/reply.js';

const formatEmoji = (emoji: UniversalEmoji | undefined) => {
  // this is a little confusing, but ill try to explain:
  // The outer statement checks if the emoji exists. If it doesn't, it returns an empty string.
  // The inner statement checks if the bot can use the emoji, then returns it as a string.
  return emoji
    ? !emoji.id || (emoji as GuildEmoji).available
      ? emoji.toString() // bot has access or unicode emoji
      : `[:${emoji.name}:](${emoji.url})`
    : ''; // bot cannot use the emoji
};

export default class ReactionsnipeCommand extends BaseCommand {
  constructor() {
    super(
      'reactionsnipe',
      'util',
      ['rsnipe'],
      0,
      'shows the last removed reaction from a message in this channel'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const snipe = reactionSnipes[message.channel.id];
    if (args[0] && message.mentions.channels.first()) {
      const channelSnipe =
        reactionSnipes[message.mentions.channels.first()?.id ?? ''];
      if (channelSnipe)
        await reply(
          message,
          channelSnipe
            ? new MessageEmbed()
                .setDescription(
                  `reacted with ${formatEmoji(
                    channelSnipe.emoji
                  )} on [this message](${channelSnipe.messageURL})`
                )
                .setAuthor(channelSnipe.user?.tag ?? '')
                .setColor('GREEN')
                .setFooter(`#${(message.channel as TextChannel).name}`)
                .setTimestamp(channelSnipe.createdAt)
            : { title: "There's nothing to snipe!" }
        );
      else
        await reply(message, {
          title: "That channel doesn't exist.",
          color: 'RED',
        });
      return;
    }
    await reply(
      message,
      snipe
        ? new MessageEmbed()
            .setDescription(
              `reacted with ${formatEmoji(snipe.emoji)} on [this message](${
                snipe.messageURL
              })`
            )
            .setAuthor(snipe.user?.tag ?? '')
            .setColor('RANDOM')
            .setFooter(`#${(message.channel as TextChannel).name}`)
            .setTimestamp(snipe.createdAt)
        : { title: "There's nothing to snipe!" }
    );
  }
}
