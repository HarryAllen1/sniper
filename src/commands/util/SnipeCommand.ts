import { Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { snipes, unSnipes } from './snipes.js';
import { reply } from '../../utils/helpers/message.js';

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

  async run(client: DiscordClient, message: Message, args: string[]) {
    let type: 'messages' | 'embeds' | 'attachments' = 'messages';
    if (args[0] && !/^(embeds|attachments|messages)$/i.test(args[0]))
      // we know that its the same because of the regex test.
      type = args[0] as 'messages' | 'embeds' | 'attachments';
    const snipe = snipes[message.channel.id];

    await reply(
      message,
      snipe
        ? new MessageEmbed()
            .setDescription(
              `${
                message.author.bot
                  ? "(if there is nothing here, the message was probably an embed and i can't send embeds in embeds)\n"
                  : ''
              }${snipe.content}`
            )
            .setAuthor(snipe.author?.tag ?? '')
            .setColor('GREEN')
            .setFooter(
              `#${
                (message.channel as TextChannel).name
              } | If the original author wants to remove this message, they can use the \`unsnipe\` command.`
            )
            .setTimestamp(snipe.createdAt ? snipe.createdAt : 0)
        : {
            title: "There's nothing to snipe!",
            description:
              'Deleted messages can only be sniped within 5 minutes of deletion.',
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
  }
}
