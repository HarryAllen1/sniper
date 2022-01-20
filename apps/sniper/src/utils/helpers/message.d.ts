import {
  MessageEmbedOptions,
  TextChannel,
  MessageEmbed,
  ReplyMessageOptions,
  Message,
} from 'discord.js';

export function send(
  messageOrChannel: Message,
  embed: MessageEmbed | MessageEmbedOptions,

  otherOptions?: ReplyMessageOptions
): Message;
export function send(
  messageOrChannel: TextChannel,
  embed: MessageEmbed | MessageEmbedOptions,

  otherOptions?: ReplyMessageOptions
): TextChannel;
