import { Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { snipes } from './snipes';

export default class SnipeCommand extends BaseCommand {
  constructor() {
    super('snipe', 'util', [], 1000, 'Shows the last deleted message.');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const snipe = snipes[message.channel.id];

    await message.reply(
      snipe
        ? {
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `${
                    message.author.bot
                      ? "(if there is nothing here, the message was probably an embed and i can't send embeds in embeds)\n"
                      : ''
                  }${snipe.content}`
                )
                .setAuthor(snipe.author!.tag)
                .setColor('GREEN')
                .setFooter(`#${(message.channel as TextChannel).name}`)
                .setTimestamp(snipe.createdAt ? snipe.createdAt : 0),
            ],
          }
        : "There's nothing to snipe!"
    );
  }
}
