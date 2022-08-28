import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { Message } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Gives a warning message about slash commands',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.reply(
      "Since you are already using slash commands, you don't need this command."
    );
  }

  public async messageRun(message: Message) {
    await message.reply(
      'Message commands are being phased out. Please use slash commands instead.'
    );
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1012796150857871442'],
      }
    );
  }
}
