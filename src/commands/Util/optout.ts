import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { setUserData } from '../../lib/index.js';

@ApplyOptions<Command.Options>({
  description: 'Opts out of data collection',
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addBooleanOption((i) =>
            i
              .setName('value')
              .setDescription('Whether to opt out of data collection')
              .setRequired(true)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1015356317684207697'],
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await setUserData(interaction.user.id, {
      dataOptOut: interaction.options.getBoolean('value'),
    });
    await interaction.reply({
      content: `You have opted ${
        interaction.options.getBoolean('value') ? 'out' : 'in'
      } of data collection. This means that the snipe, editsnipe, and reactionsnipe commands will not work for your messages/reactions.`,
      ephemeral: true,
    });
  }
}
