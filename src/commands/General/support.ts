import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
  description: 'Gives a link to the Sniper support server',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.reply('https://discord.gg/uShPGFDJCJ');
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1012599505163649024'],
      }
    );
  }
}
