import {
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  TextChannel,
  ReplyMessageOptions,
} from 'discord.js';

import { getUserData } from './user';

export const reply = async (
  message: Message,
  embed: MessageEmbed | MessageEmbedOptions,

  otherOptions: ReplyMessageOptions = {},
  ephemeral?: boolean
): Promise<Message> => {
  const { files, attachments, components, content, tts, nonce, stickers } =
    otherOptions;
  embed.color ||= 'WHITE';
  if (
    (message.channel as TextChannel)
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion -- You kind of have to do this
      .permissionsFor(message.guild?.me!)
      .has('SEND_MESSAGES')
  )
    return getUserData(message?.author?.id || message.member?.id || '').then(
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
              failIfNotExists: false,
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
              failIfNotExists: false,
              nonce,
              stickers,
              //@ts-ignore
              ephemeral:
                ephemeral !== null || ephemeral !== undefined
                  ? ephemeral
                  : true,
            })
    );
  else {
    return message.author.send("I can't send messages in that channel.");
  }
};

export const send = async (
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

    nonce,
    stickers,
  } = otherOptions;
  embed.color ||= 'WHITE';
  if (
    (message.channel as TextChannel)
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion -- You kind of have to do this
      .permissionsFor(message.guild?.me!)
      .has('SEND_MESSAGES')
  )
    return message.channel.send({
      embeds: [embed],

      files,
      attachments,
      content,
      components,
      tts,

      nonce,
      stickers,
    });
  else {
    return message.author.send("I can't send messages in that channel.");
  }
};
