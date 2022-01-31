import { APIEmbed } from 'discord-api-types/v9';
import {
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  ReplyMessageOptions,
  TextChannel,
} from 'discord.js';
import ms from 'ms';
import { sleep, StringValue } from './misc.js';
import { getUserData } from './user.js';

export async function reply(
  message: Message,
  embed: string | MessageEmbed | MessageEmbedOptions | APIEmbed,
  otherOptions: ReplyMessageOptions = {},
  ephemeral?: boolean
): Promise<Message> {
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
  if (embed instanceof MessageEmbed) {
    if (!embed.color) embed.setColor('WHITE');
    if (embed.footer) embed.footer.text ||= 'Made by ||harry potter||#0014';
  }

  if (
    (message.channel as TextChannel)
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion -- You kind of have to do this
      .permissionsFor(message.guild?.me!)
      .has('SEND_MESSAGES') &&
    (message.channel as TextChannel)
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion
      .permissionsFor(message.guild?.me!)
      .has('EMBED_LINKS')
  ) {
    return getUserData(message?.author?.id || message.member?.id || '')
      .then((userData) =>
        message.type !== 'APPLICATION_COMMAND'
          ? message.reply({
              embeds: embed instanceof MessageEmbed ? [embed] : [],
              allowedMentions: {
                repliedUser: userData?.settings?.mentionAuthorOnReply
                  ? userData.settings?.mentionAuthorOnReply?.value
                  : true,
              },
              files,
              attachments,
              content: typeof embed === 'string' ? embed : content,
              components,
              tts,
              failIfNotExists: false,
              nonce,
              stickers,
            })
          : message
              .reply({
                embeds: embed instanceof MessageEmbed ? [embed] : [],
                allowedMentions: {
                  repliedUser: userData?.settings?.mentionAuthorOnReply
                    ? userData.settings?.mentionAuthorOnReply?.value
                    : true,
                },
                files,
                attachments,
                content: typeof embed === 'string' ? embed : content,
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
              .catch((err) => {
                console.error(err);
                return message.author.send('Something went wrong.');
              })
      )
      .catch((err) => {
        // console.error(err);
        return message.reply({
          embeds: embed instanceof MessageEmbed ? [embed] : [],
          allowedMentions: {
            repliedUser: true,
          },
          files,
          attachments,
          content: typeof embed === 'string' ? embed : content,
          components,
          tts,
          failIfNotExists: false,
          nonce,
          stickers,
        });
      });
  } else {
    return message.author.send(
      'I do not have the permissions to send messages in that channel. Contact a server admin and tell them to give Sniper the permission to send messages in that channel.'
    );
  }
}

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

export const disableAllComponents = (message: Message) => {
  if (!message.components && !message.components[0]) return message;

  message.components.forEach((component) => {
    component.components.forEach((v) => {
      v.disabled = true;
    });
  });
  return message.edit({
    components: message.components,
  });
};

export const removeAllComponents = (message: Message) => {
  if (!message.components && !message.components[0]) return message;

  return message.edit({
    components: [],
  });
};

export class CreateAuthorOnlyMessageReactionCollector {
  /**
   * Equivalent to `Message.createMessageComponentCollector` but only allows the collector to be used by the author.`
   * @param {Message} message The message to create the collector on.
   * @param {Number | String} time  How long to run the collector for.
   */
  constructor(message: Message, time: number | StringValue) {
    if (typeof time === 'string') {
      time = ms(time);
    }
    // We checked for a string value, and converted it to a number if it was a string.
    time = time as number;
    sleep(time);
    return message.createMessageComponentCollector({});
  }
}
