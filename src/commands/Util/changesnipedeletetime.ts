import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { Colors, PermissionFlagsBits } from 'discord.js';
import { setGuildSettings } from '../../lib/index.js';

@ApplyOptions<Command.Options>({
  description: 'Changes the time before snipes are deleted',
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
              .setName('time')
              .setDescription('The time in minutes before snipes are deleted')
              .setRequired(true)
          )
          .setDMPermission(false)
          .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1017611664855674930'],
      }
    );
  }

  @RequiresUserPermissions(PermissionFlagsBits.ManageGuild)
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await setGuildSettings(interaction.guildId!, {
      snipeDeleteTime: interaction.options.getInteger('time'),
    });
    await interaction.reply({
      embeds: [
        {
          title: `Snipe delete time changed to ${interaction.options.getInteger(
            'time',
            true
          )} minutes`,
          color: Colors.Green,
        },
      ],
    });
  }
}
