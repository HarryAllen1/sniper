import {
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  TextChannel,
  ReplyMessageOptions,
} from 'discord.js';
import './message.js';
import ms from 'ms';
import { sleep } from './misc.js';
import randomNumber from './randomNumber.js';

import { getUserData } from './user.js';

const ads: string[] = [
  'Join our support server for bot updates and support: https://discord.gg/wsEHfhzk54',
  'This bot also has an (almost) full currency system. Check out the currency page of the help command for more info.',
];

export const reply = async (
  message: Message,
  embed: MessageEmbed | MessageEmbedOptions,

  otherOptions: ReplyMessageOptions = {},
  ephemeral?: boolean
): Promise<Message> => {
  const ad = randomNumber(1, 30, true) === 1;
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
              content:
                content || ad ? ads[randomNumber(0, ads.length - 1)] : null,
              components,
              tts,
              failIfNotExists: false,
              nonce,
              stickers,
            })
          : message
              .reply({
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
              .catch((err) => {
                console.error(err);
                return message.author.send('Something went wrong.');
              })
    );
  else {
    return message.author.send("I can't send messages in that channel.");
  }
};

export const send = async (
  messageOrChannel: Message | TextChannel,
  embed: MessageEmbed | MessageEmbedOptions,

  otherOptions: ReplyMessageOptions = {}
): Promise<Message | undefined> => {
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
  } else {
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
};

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
  constructor(message: Message, time: number | string) {
    if (typeof time === 'string') {
      time = ms(time);
    }
    // We checked for a string value, and converted it to a number if it was a string.
    time = time as number;
    sleep(time);
    return message.createMessageComponentCollector({});
  }
}
