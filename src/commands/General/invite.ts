import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
  description: 'Invite directions for this bot',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.reply(
      'Directions can be found here: https://sniper.pages.dev/invite.html'
    );
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1012580904595619851'],
      }
    );
  }
}
