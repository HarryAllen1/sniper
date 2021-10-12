import {
  Message,
  MessageEmbed,
  MessageEmbedOptions,
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
        repliedUser: userData.settings.mentionAuthorOnReply
          ? userData.settings.mentionAuthorOnReply?.value
          : true,
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
