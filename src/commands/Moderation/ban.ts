import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior, UserError } from '@sapphire/framework';
import { DiscordAPIError, PermissionFlagsBits } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Bans members',
  requiredClientPermissions: [PermissionFlagsBits.BanMembers],
  requiredUserPermissions: [PermissionFlagsBits.BanMembers],
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;

    const rawTargets = interaction.options
      .getString('users', true)
      .replaceAll(/[\<\>\!\@]/g, '')
      .split(/\s+/g);

    const targets = Promise.all(
      rawTargets.map((v) =>
        interaction.guild.members.fetch(v).catch((r: DiscordAPIError) => {
          throw new UserError({
            identifier: 'argumentInvalidSnowflake',
            context: r.message,
            message:
              'One or more of the user IDs provided failed to fetch. Check that the user ID was valid.',
          });
        })
      )
    );

    (await targets).forEach((v) =>
      v.ban({
        reason: interaction.options.getString('reason', false) as
          | string
          | undefined,
      })
    );

    await interaction.reply(
      `Banned ${(await targets).map((v) => v.user.tag).join(', ')}`
    );
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((i) =>
            i
              .setName('users')
              .setDescription(
                'The users to ban. Should be mentioned or space-separated IDs'
              )
              .setRequired(true)
          )
          .addStringOption((i) =>
            i
              .setName('reason')
              .setDescription('The reason for the ban')
              .setRequired(false)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1014030514648272916'],
      }
    );
  }
}
