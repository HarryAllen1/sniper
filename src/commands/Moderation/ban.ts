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

    (await targets).forEach((v) => v.ban());

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
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1012796156587282573', '1012800318213460099'],
      }
    );

    registry.registerContextMenuCommand((b) =>
      b.setName('ban').setType(ApplicationCommandType.User)
    );
  }
}
