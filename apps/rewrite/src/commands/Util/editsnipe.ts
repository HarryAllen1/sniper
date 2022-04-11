import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputInteraction) {}
}
