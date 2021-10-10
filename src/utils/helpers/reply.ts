import {
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  MessagePayload,
  ReplyMessageOptions,
} from 'discord.js';

import { getUserData } from './user';

export const reply = async (
  message: Message,
  embed: MessageEmbed | MessageEmbedOptions,
  otherOptions: ReplyMessageOptions = {}
): Promise<Message> => {
  const {
    files,
    attachments,
    components,
    content,
    tts,
    failIfNotExists,
    nonce,
    stickers,
  } = otherOptions;
  return getUserData(message.author.id).then((userData) =>
    message.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: userData.settings.mentionAuthorOnReply.value,
      },
      files,
      attachments,
      content,
      components,
      tts,
      failIfNotExists,
      nonce,
      stickers,
    })
  );
};
