import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
  description: '',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.reply('Hello World!');
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
      }
    );
  }
}
