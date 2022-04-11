import { ApplyOptions } from '@sapphire/decorators';
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
  RegisterBehavior,
} from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';
import { createHelpCommand } from 'discord-help-command-creator';

@ApplyOptions<CommandOptions>({
  description: 'Displays commands',
  chatInputCommand: {
    register: true,
  },
  aliases: ['commands'],
  requiredClientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: CommandInteraction) {
    createHelpCommand(this.container.stores.get('commands'), interaction);
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
        idHints: ['956774097906462730'],
      }
    );
  }
}
