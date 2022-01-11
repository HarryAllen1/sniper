import { Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { snipes, unSnipes } from './snipes.js';
import { reply } from '../../utils/helpers/message.js';
import { Paginator } from '../../utils/helpers/paginator.js';

export default class SnipeCommand extends BaseCommand {
  constructor() {
    super(
      'snipe',
      'util',
      [],
      3000,
      "After a message is deleted, this command shows what it was. If the creator of the deleted message doesn't want that message to be shown, they can use the `unsnipe` command.",
      {
        argsRequired: false,
        argsDescription: '[type: embeds | attachments | messages]',
      }
    );
  }

  async run(
    client: DiscordClient,
    message: Message,
    args: string[]
  ): Promise<any> {
    let type: 'messages' | 'embeds' | 'attachments' = 'messages';
    if (args[0] && /^(embeds|attachments|messages)$/i.test(args[0]))
      // we know that its the same because of the regex test.
      type = args[0] as 'messages' | 'embeds' | 'attachments';

    const snipe = snipes[message.channel.id];
    if (!snipe)
      return reply(message, {
        title: "There's nothing to snipe!",
        description:
          'Deleted messages can only be sniped within 15 minutes of deletion.',
        color: 'RED',
      });

    if (
      !snipe.content &&
      snipe.embeds &&
      snipe.embeds !== [] &&
      snipe.embeds[0] &&
      !args[0]
    )
      type = 'embeds';

    if (
      !snipe.content &&
      !snipe.embeds?.length &&
      snipe.attachments &&
      !args[0]
    )
      type = 'attachments';

    if (type === 'messages') {
      if (!snipe.content && snipe.embeds?.length) {
        return reply(message, {
          title:
            "This message didn't have any content, but it did have an embed. Trying this command again with the `embeds` type....",
        }).then(() => this.run(client, message, ['embeds']));
      }
      await reply(
        message,
        snipe
          ? new MessageEmbed()
              .setDescription(
                `${
                  message.author.bot
                    ? "(if there is nothing here, the message was probably an embed and i can't send embeds in embeds)\n"
                    : ''
                }${snipe.content}${
                  snipe.attachments?.length
                    ? `\n\nAttachment(s): ${snipe.attachments
                        .map((val) => ` ${val} `)
                        .toString()}`
                    : ``
                }`
              )
              .setAuthor({ name: snipe.author?.tag ?? '' })
              .setColor('GREEN')
              .setFooter({
                text: `#${
                  (message.channel as TextChannel).name
                } | If the original author wants to remove this message, they can use the \`unsnipe\` command.`,
              })
              .setTimestamp(snipe?.createdAt ? snipe.createdAt : 0)
          : {
              title: "There's nothing to snipe!",
              description:
                'Deleted messages can only be sniped within 1 hour of deletion.',
              color: 'RED',
            },

        // snipe?.message?.attachments.first()
        //   ? {
        //       attachments: snipe.message.attachments.toJSON(),
        //     }
        //   :
        {}
      ).then((msg) => {
        unSnipes[message.channel.id] = {
          msg,
        };
      });
    } else if (type === 'embeds') {
      if (!snipe.embeds?.length)
        return reply(message, {
          title:
            "This message doesn't have any embeds! Trying this command again with the `messages` type....",
          color: 'RED',
        }).then(() => this.run(client, message, ['messages']));
      const paginator = new Paginator(
        snipe.embeds.map((e) => ({ embeds: [e] }))
      );
      const unSnipe = await paginator.start({ message });
      unSnipes[message.channel.id] = {
        msg: unSnipe,
      };
    } else if (type === 'attachments') {
      if (!snipe.attachments?.length)
        return reply(message, {
          title: "This message doesn't have any attachments.",
          color: 'RED',
        });
      const paginator = new Paginator(
        snipe.attachments.map((a) => ({ content: a }))
      );
      const unSnipe = await paginator.start({ message });
      unSnipes[message.channel.id] = {
        msg: unSnipe,
      };
    }
  }
}
