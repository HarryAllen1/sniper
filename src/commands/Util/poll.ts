import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';
import ms from 'ms';

@ApplyOptions<Command.Options>({
  description: 'Creates a poll',
  cooldownDelay: ms('5s'),
})
export class PingCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (i) =>
        i
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((i) =>
            i
              .setName('question')
              .setDescription('The question to ask')
              .setRequired(true)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        idHints: ['1014030172707622954', '1014036389433708544'],
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const msg = await interaction.reply({
      embeds: [
        {
          title: 'Poll',
          description: interaction.options.getString('question', true),
        },
      ],
      fetchReply: true,
    });
    await msg.react('👍');
    await msg.react('👎');
  }
}
