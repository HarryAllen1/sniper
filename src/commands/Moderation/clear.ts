import {
  ApplyOptions,
  RequiresClientPermissions,
  RequiresGuildContext,
  RequiresUserPermissions,
} from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { Colors, PermissionFlagsBits } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Clears some messages from a channel',
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addIntegerOption((i) =>
            i
              .setName('messages')
              .setDescription('The number of messages to delete. Max 100')
              .setRequired(true)
          )
          .addBooleanOption((i) =>
            i
              .setName('ephemeral')
              .setDescription(
                'Whether the response should be ephemeral. Defaults to true.'
              )
              .setRequired(false)
          )
          .setDMPermission(false),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1014030432003702784', '1014592882331623428'],
      }
    );
  }

  @RequiresGuildContext()
  @RequiresClientPermissions(PermissionFlagsBits.ManageMessages)
  @RequiresUserPermissions(PermissionFlagsBits.ManageMessages)
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    if (!interaction.inGuild()) return;
    if (interaction.options.getInteger('messages', true) > 100)
      return interaction.reply({
        embeds: [
          {
            title: "I can't clear that many messages",
            description:
              "The number of messages must be less than 100 (it's an API limit)",
            color: Colors.Red,
          },
        ],
      });

    if (interaction.options.getInteger('messages', true) < 1)
      return interaction.reply({
        embeds: [
          {
            title: 'I have to delete at least 1 message',
            color: Colors.Red,
          },
        ],
      });

    await interaction.channel?.bulkDelete(
      interaction.options.getInteger('messages', true)
    );

    await interaction.reply({
      embeds: [
        {
          title: `Deleted ${interaction.options.getInteger(
            'messages',
            true
          )} messages.`,
          color: Colors.Green,
        },
      ],
      ephemeral: interaction.options.getBoolean('ephemeral', false) ?? true,
    });
  }
}
