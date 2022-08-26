import { ApplyOptions, RequiresGuildContext } from '@sapphire/decorators';
import {
  ApplicationCommandRegistry,
  Command,
  RegisterBehavior,
} from '@sapphire/framework';
import { Message, PermissionFlagsBits } from 'discord.js';
import { createHelpCommand } from '../../lib/util/createHelpCommand.js';

@ApplyOptions<Command.Options>({
  description: 'Displays commands',
  requiredClientPermissions: [
    PermissionFlagsBits.EmbedLinks,
    PermissionFlagsBits.SendMessages,
  ],
})
export class UserCommand extends Command {
  @RequiresGuildContext()
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await createHelpCommand(this.container.stores.get('commands'), interaction);
  }

  @RequiresGuildContext()
  public async messageRun(message: Message) {
    await createHelpCommand(this.container.stores.get('commands'), message);
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
