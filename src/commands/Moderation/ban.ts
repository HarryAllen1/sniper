import {
  ApplyOptions,
  RequiresClientPermissions,
  RequiresUserPermissions,
} from '@sapphire/decorators';
import { Command, RegisterBehavior, UserError } from '@sapphire/framework';
import {
  ApplicationCommandType,
  DiscordAPIError,
  PermissionFlagsBits,
  UserContextMenuCommandInteraction,
} from 'discord.js';

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

  @RequiresClientPermissions('BanMembers')
  @RequiresUserPermissions('BanMembers')
  public async contextMenuRun(
    interaction: UserContextMenuCommandInteraction<'cached'>
  ) {
    const target = interaction.targetMember;
    await target.ban();
    await interaction.reply(
      `Banned ${target.user.tag} ${
        target.nickname ? `(${target.nickname})` : ''
      }`
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
      }
    );

    registry.registerContextMenuCommand(
      (b) => b.setName('ban').setType(ApplicationCommandType.User),
      {
        idHints: ['1013906694746689577'],
      }
    );
  }
}
