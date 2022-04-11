import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
  detailedDescription: {},
})
export class UserCommand extends Command {
  public chatInputRun(interaction: Command.ChatInputInteraction) {}
}
