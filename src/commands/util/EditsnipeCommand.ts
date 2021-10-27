import { Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { editSnipes } from './snipes';
import { reply } from '../../utils/helpers/reply';

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
    if (args[0] && message.mentions.channels.first()) {
      const channelSnipe = editSnipes[message.mentions.channels.first()?.id!];
      await reply(
        message,
        channelSnipe
          ? new MessageEmbed()

              .addField('Old message:', channelSnipe.content!)
              .addField(
                'New message:',
                `[Jump!](https://discord.com/channels/${message.guild!.id}/${
                  message.mentions.channels.first()?.id
                }/${channelSnipe.id})`
              )
              .setAuthor(channelSnipe.author!.tag)
              .setColor('GREEN')
              .setFooter(`#${(message.channel as TextChannel).name}`)
              .setTimestamp(channelSnipe.createdAt ? channelSnipe.createdAt : 0)
          : new MessageEmbed()
              .setTitle("There's nothing to snipe!")
              .setColor('RED')
      );
      return;
    }
    await reply(
      message,
      snipe
        ? new MessageEmbed()

            .addField('Old message:', snipe.content!)
            .addField(
              'New message:',
              `[Jump!](https://discord.com/channels/${message.guild!.id}/${
                message.channel.id
              }/${snipe.id})`
            )
            .setAuthor(snipe.author!.tag)
            .setColor('GREEN')
            .setFooter(`#${(message.channel as TextChannel).name}`)
            .setTimestamp(snipe.createdAt ? snipe.createdAt : 0)
        : new MessageEmbed()
            .setTitle("There's nothing to snipe!")
            .setColor('RED')
    );
  }
}
