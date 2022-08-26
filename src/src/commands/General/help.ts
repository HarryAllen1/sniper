import { ApplyOptions, RequiresGuildContext } from '@sapphire/decorators';
import {
  ApplicationCommandRegistry,
  Command,
  RegisterBehavior,
} from '@sapphire/framework';
import { createHelpCommand } from 'discord-help-command-creator';
import type { CommandInteraction, Message } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'Displays commands',
  requiredClientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
})
export class UserCommand extends Command {
  @RequiresGuildContext()
  public async chatInputRun(interaction: CommandInteraction) {
    createHelpCommand(this.container.stores.get('commands'), interaction);
  }

  @RequiresGuildContext()
  public async messageRun(message: Message) {
    createHelpCommand(this.container.stores.get('commands'), message);
  }

  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
      },
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        idHints: ['978003059479314483'],
      }
    );
  }
}
