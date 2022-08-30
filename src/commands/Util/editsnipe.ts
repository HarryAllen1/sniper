import { ApplyOptions, RequiresGuildContext } from '@sapphire/decorators';
import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { Colors, EmbedBuilder, Message, TextChannel } from 'discord.js';
import { editSnipes } from '../../lib/snipes.js';

@ApplyOptions<Command.Options>({
  name: 'editsnipe',
  description:
    'After a message is edited, you can use this command to see the old message.',
})
export class UserCommand extends Command {
  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description),
      {
        idHints: ['1014030262897745930', '1014036387995058237'],
      }
    );
  }

  @RequiresGuildContext((i) => {
    i.reply('This command can only be used in a guild.');
  })
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const channel = interaction.channel as TextChannel;
    const snipe = editSnipes[channel.id];
    if (!snipe)
      return interaction.reply({
        embeds: [
          {
            title: "There's nothing to snipe!",
            description:
              'Deleted messages can only be sniped within 1 hour of deletion.',
            color: Colors.Red,
          },
        ],
      });

    await interaction.reply({
      embeds: [
        snipe
          ? new EmbedBuilder()
              .addFields(
                { name: 'Old message:', value: snipe.content ?? '' },
                {
                  name: 'New message:',
                  value: `[Jump!](https://discord.com/channels/${interaction.guild?.id}/${interaction.channelId}/${snipe.id})`,
                }
              )
              .setAuthor({ name: snipe.author?.tag ?? '' })
              .setColor(Colors.Green)
              .setFooter({
                text: `#${channel.name}`,
              })
              .setTimestamp(snipe.createdAt ? snipe.createdAt : 0)
          : new EmbedBuilder()
              .setTitle("There's nothing to snipe!")
              .setColor(Colors.Red),
      ],
    });
  }

  public async messageRun(message: Message) {
    const snipe = editSnipes[message.channelId];
    if (!snipe)
      return message.reply({
        embeds: [
          {
            title: "There's nothing to snipe!",
            description:
              'Deleted messages can only be sniped within 1 hour of deletion.',
            color: Colors.Red,
          },
        ],
      });

    await message.reply({
      embeds: [
        snipe
          ? new EmbedBuilder()
              .addFields(
                { name: 'Old message:', value: snipe.content ?? '' },
                {
                  name: 'New message:',
                  value: `[Jump!](https://discord.com/channels/${message.guild?.id}/${message.channelId}/${snipe.id})`,
                }
              )
              .setAuthor({ name: snipe.author?.tag ?? '' })
              .setColor(Colors.Green)
              .setFooter({ text: `#${(message.channel as TextChannel).name}` })
              .setTimestamp(snipe.createdAt ? snipe.createdAt : 0)
          : new EmbedBuilder()
              .setTitle("There's nothing to snipe!")
              .setColor(Colors.Red),
      ],
    });
  }
}
