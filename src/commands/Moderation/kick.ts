import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior, UserError } from '@sapphire/framework';
import { DiscordAPIError, PermissionFlagsBits } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Kicks members',
  requiredClientPermissions: [PermissionFlagsBits.KickMembers],
  requiredUserPermissions: [PermissionFlagsBits.KickMembers],
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
      v.kick(
        interaction.options.getString('reason', false) as string | undefined
      )
    );

    await interaction.reply(
      `Kicked ${(await targets).map((v) => v.user.tag).join(', ')}`
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
                'The users to kick. Should be mentioned or space-separated IDs'
              )
              .setRequired(true)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1014030433253597204', '1014036554928365608'],
      }
    );
  }
}
