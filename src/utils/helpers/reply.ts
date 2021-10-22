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

  otherOptions: ReplyMessageOptions = {},
  ephemeral?: boolean
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
  embed.color ||= 'WHITE';

  return getUserData(
    // @ts-ignore
    message?.author?.id ? message.author.id : message.user?.id
  ).then((userData) =>
    message.type !== 'APPLICATION_COMMAND'
      ? message.reply({
          embeds: [embed],
          allowedMentions: {
            repliedUser: userData?.settings?.mentionAuthorOnReply
              ? userData.settings?.mentionAuthorOnReply?.value
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
      : message.reply({
          embeds: [embed],
          allowedMentions: {
            repliedUser: userData?.settings?.mentionAuthorOnReply
              ? userData.settings?.mentionAuthorOnReply?.value
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
          //@ts-ignore
          ephemeral:
            ephemeral !== null || ephemeral !== undefined ? ephemeral : true,
        })
  );
};
