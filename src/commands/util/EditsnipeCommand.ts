import { Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { editSnipes } from './snipes';

export default class EditsnipeCommand extends BaseCommand {
  constructor() {
    super(
      'editsnipe',
      'util',
      ['esnipe'],
      0,
      'Shows the last edited messages content before it was edited'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const snipe = editSnipes[message.channel.id];

    await message.reply(
      snipe
        ? {
            embeds: [
              new MessageEmbed()

                .addField('Old message:', snipe.content!)
                .addField(
                  'New message:',
                  `[Jump!](https://discord.com/channels/${message.guild!.id}/${
                    message.channel.id
                  }/${snipe.id})`
                )
                .setAuthor(snipe.author!.tag)
                .setColor('RANDOM')
                .setFooter(`#${(message.channel as TextChannel).name}`)
                .setTimestamp(snipe.createdAt ? snipe.createdAt : 0),
            ],
          }
        : "There's nothing to snipe!"
    );
  }
}
