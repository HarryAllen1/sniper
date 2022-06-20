import type { APIEmbed } from 'discord-api-types/v10';
import {
  CommandInteraction,
  Message,
  MessageEmbed,
  TextChannel,
  type MessageEmbedOptions,
  type ReplyMessageOptions,
} from 'discord.js';
import './message.js';
import { getUserData } from './user.js';

export const reply = async (
  message: Message | CommandInteraction,
  embed: MessageEmbed | MessageEmbedOptions | APIEmbed | string,
  otherOptions: ReplyMessageOptions = {},
  ephemeral?: boolean
): Promise<Message> => {
  if (typeof embed === 'string') embed = { title: embed };
  const author = message instanceof Message ? message.author : message.user;
  if (otherOptions.attachments || otherOptions.files) {
    if (
      !(message.channel as TextChannel)
        // eslint-disable-next-line
        .permissionsFor(message.guild!.me!)
        .has('ATTACH_FILES')
    ) {
      message.reply('I do not have permission to send files.');
      otherOptions.files = [];
      otherOptions.attachments = [];
    }
  }
  const { files, attachments, components, content, tts, nonce, stickers } =
    otherOptions;
  embed.color ||= 'WHITE';
  if (embed.footer) embed.footer.text ||= 'Made by ||harry potter||#0014';
  if (
    (message.channel as TextChannel)
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion -- You kind of have to do this
      .permissionsFor(message.guild?.me!)
      .has('SEND_MESSAGES') &&
    (message.channel as TextChannel)
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion
      .permissionsFor(message.guild?.me!)
      .has('EMBED_LINKS')
  )
    return getUserData(author.id).then((userData) =>
      message.type !== 'APPLICATION_COMMAND'
        ? (message.reply({
            // @ts-ignore
            embeds: [embed],
            allowedMentions: {
              repliedUser: userData?.settings?.mentionAuthorOnReply
                ? userData.settings?.mentionAuthorOnReply?.value
                : true,
            },
            files,
            attachments,
            content,
            fetchReply: true,
            components,
            tts,
            failIfNotExists: false,
            nonce,
            stickers,
          }) as Promise<Message>)
        : (
            message.reply({
              // @ts-ignore
              embeds: [embed],
              allowedMentions: {
                repliedUser: userData?.settings?.mentionAuthorOnReply
                  ? userData.settings?.mentionAuthorOnReply?.value
                  : true,
              },
              files,
              attachments,
              fetchReply: true,
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
            }) as Promise<Message>
          ).catch((err) => {
            console.error(err);
            return author.send('Something went wrong.') as Promise<Message>;
          })
    );
  else {
    return author.send("I can't send embeds in that channel.");
  }
};

export async function send(
  messageOrChannel: TextChannel,
  embed: MessageEmbed | MessageEmbedOptions,
  otherOptions: ReplyMessageOptions
): Promise<TextChannel>;
export async function send(
  messageOrChannel: Message,
  embed: MessageEmbed | MessageEmbedOptions,
  otherOptions: ReplyMessageOptions
): Promise<Message>;
export async function send(
  messageOrChannel: Message | TextChannel,
  embed: MessageEmbed | MessageEmbedOptions,

  otherOptions: ReplyMessageOptions = {}
): Promise<Message | TextChannel | undefined> {
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
  if (messageOrChannel instanceof Message) {
    if (
      (messageOrChannel.channel as TextChannel)
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion -- You kind of have to do this
        .permissionsFor(messageOrChannel.guild?.me!)
        .has('SEND_MESSAGES')
    )
      return messageOrChannel.channel.send({
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
      return messageOrChannel.author.send(
        "I can't send messages in that channel."
      );
    }
  } else if (messageOrChannel instanceof TextChannel) {
    if (
      messageOrChannel
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion -- You kind of have to do this
        .permissionsFor(messageOrChannel.guild?.me!)
        .has('SEND_MESSAGES')
    ) {
      const sentMessage = messageOrChannel.send({
        embeds: [embed],

        files,
        attachments,
        content,
        components,
        tts,

        nonce,
        stickers,
      });
      sentMessage.catch((err) => console.error(err));
      return sentMessage;
    }
  }
}
