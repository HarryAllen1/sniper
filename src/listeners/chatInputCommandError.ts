import { ApplyOptions } from '@sapphire/decorators';
import {
  ChatInputCommandErrorPayload,
  Events,
  Listener,
  UserError,
} from '@sapphire/framework';

@ApplyOptions<Listener.Options>({
  event: Events.ChatInputCommandError,
})
export class UserListener extends Listener<
  typeof Events.ChatInputCommandError
> {
  public async run(
    error: unknown,
    { interaction, command }: ChatInputCommandErrorPayload
  ) {
    if (interaction.replied) {
      if (error instanceof UserError) {
        await interaction.followUp(`${error.identifier}: ${error.message}`);
      } else
        await interaction.followUp({
          content: `An unknown occurred while running the command: ${command.name}`,
          ephemeral: true,
        });
    } else if (error instanceof UserError) {
      await interaction.reply(`${error.identifier}: ${error.message}`);
    } else
      await interaction.reply({
        content: `An unknown occurred while running the command: ${command.name}`,
        ephemeral: true,
      });
  }
}
