import { ApplyOptions, RequiresGuildContext } from '@sapphire/decorators';
import {
  ApplicationCommandRegistry,
  Command,
  RegisterBehavior,
} from '@sapphire/framework';
import { PermissionFlagsBits } from 'discord.js';
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
    // if (interaction.options.getString('command', false)) {
    //   const cmd = this.container.stores.get('commands').get(
    //     interaction.options.getString('command', false)!
    //   )!;
    //   return interaction.reply({
    //     embeds: [
    //       {
    //         title: cmd.name,
    //         description: cmd.description,
    //         fields: [
    //           {
    //             name: 'Options',
    //             value: regCmd.
    //           }
    //         ]
    //       }
    //     ],
    //   });
    // }
    await createHelpCommand(this.container.stores.get('commands'), interaction);
  }

  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    registry.registerChatInputCommand(
      (b) => b.setName(this.name).setDescription(this.description),
      // .addStringOption((i) =>
      //   i
      //     .setName('command')
      //     .setDescription('The command to get help for')
      //     .setRequired(false)
      //     .setChoices(
      //       ...this.container.stores
      //         .get('commands')
      //         .filter((v) => v.category !== 'Restricted')
      //         .map((cmd) => ({
      //           name: cmd.name,
      //           value: cmd.name,
      //         }))
      //     )
      // )
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        idHints: ['1014030429701029929'],
      }
    );
  }
}
