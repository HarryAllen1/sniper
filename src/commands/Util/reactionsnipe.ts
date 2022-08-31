import { ApplyOptions, RequiresGuildContext } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Colors, EmbedBuilder, GuildEmoji, TextChannel } from 'discord.js';
import { reactionSnipes, UniversalEmoji } from '../../lib/snipes.js';

@ApplyOptions<Command.Options>({
  description: 'Snipes a reaction',
})
export class UserCommand extends Command {
  public formatEmoji = (emoji: UniversalEmoji | undefined) => {
    // this is a little confusing, but ill try to explain:
    // The outer statement checks if the emoji exists. If it doesn't, it returns an empty string.
    // The inner statement checks if the bot can use the emoji, then returns it as a string.
    return emoji
      ? !emoji.id || (emoji as GuildEmoji).available
        ? emoji.toString() // bot has access or unicode emoji
        : `[:${emoji.name}:](${emoji.url})`
      : ''; // bot cannot use the emoji
  };

  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (b) =>
        b
          .setName(this.name)
          .setDescription(this.description)
          .setDMPermission(false),
      {
        idHints: ['1014031686834602014', '1014036470702546955'],
      }
    );
  }

  @RequiresGuildContext()
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const snipe = reactionSnipes[interaction.channelId];
    const channelSnipe = snipe;

    await interaction.reply({
      embeds: [
        channelSnipe
          ? new EmbedBuilder()
              .setDescription(
                `reacted with ${this.formatEmoji(
                  channelSnipe.emoji
                )} on [this message](${channelSnipe.messageURL})`
              )
              .setAuthor({ name: channelSnipe.user?.tag ?? '' })
              .setColor(Colors.Green)
              .setFooter({
                text: `#${(interaction.channel as TextChannel).name}`,
              })
              .setTimestamp(channelSnipe.createdAt)
          : { title: "There's nothing to snipe!" },
      ],
    });
  }
}
