import {
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  Util,
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
  embed.description = Util.escapeMarkdown(embed.description || '', {
    codeBlock: false,
    inlineCode: false,
  });
  embed.fields?.forEach((field): void => {
    field.value = Util.escapeMarkdown(field.value || '', {
      codeBlock: false,
      inlineCode: false,
    });
    field.name = Util.escapeMarkdown(field.name || '', {
      codeBlock: false,
      inlineCode: false,
    });
  });
  return getUserData(message?.author?.id || message.member?.id!).then(
    (userData) =>
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
