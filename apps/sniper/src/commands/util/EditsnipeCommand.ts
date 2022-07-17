import { Message, MessageEmbed, TextChannel } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { BaseCommand } from '../../utils/structures/BaseCommand.js';
import { editSnipes } from './snipes.js';

export default class EditsnipeCommand extends BaseCommand {
  constructor() {
    super(
      'editsnipe',
      'util',
      ['esnipe'],
      0,
      'After a message is edited, you can use this command to see the old message.'
    );
  }

  registerApplicationCommands(
    client: DiscordClient,
    registry: BaseCommand.CommandsRegistry
  ) {
    registry.registerChatInputCommand((b) =>
      b.setName(this.name).setDescription(this.description)
    );
  }

  chatInputRun = this.run;

  async run(
    client: DiscordClient,
    message: Message | BaseCommand.CommandInteraction
  ): Promise<any> {
    const snipe = editSnipes[message.channelId];
    if (!snipe)
      return reply(message, {
        title: "There's nothing to snipe!",
        description:
          'Deleted messages can only be sniped within 1 hour of deletion.',
        color: 'RED',
      });

    await reply(
      message,
      snipe
        ? new MessageEmbed()
            .addField('Old message:', snipe.content ?? '')
            .addField(
              'New message:',
              `[Jump!](https://discord.com/channels/${message.guild?.id}/${message.channelId}/${snipe.id})`
            )
            .setAuthor({ name: snipe.author?.tag ?? '' })
            .setColor('GREEN')
            .setFooter({ text: `#${(message.channel as TextChannel).name}` })
            .setTimestamp(snipe.createdAt ? snipe.createdAt : 0)
        : new MessageEmbed()
            .setTitle("There's nothing to snipe!")
            .setColor('RED')
    );
  }
}
