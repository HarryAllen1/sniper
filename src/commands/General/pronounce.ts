import { ApplyOptions } from '@sapphire/decorators';
import { Command, RegisterBehavior } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
  description: 'Pronounces anything (use responsibly)',
})
export class UserCommand extends Command {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.reply({
      embeds: [
        {
          title: 'Here you go',
          description: interaction.options.getString('phrase', true),
        },
      ],
      files: [
        {
          attachment: `https://www.google.com/speech-api/v1/synthesize?text=${
            (interaction.options.getString('phrase'),
            true
              ? encodeURI(interaction.options.getString('phrase', true))
              : 'aaaaaaa')
          }&enc=mpeg&lang=en&speed=0.5&client=lr-language-tts&use_google_only_voices=1`,
          name: 'pron.mp3',
        },
      ],
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((i) =>
            i
              .setName('phrase')
              .setDescription('The phrase to pronounce')
              .setRequired(true)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        registerCommandIfMissing: true,
        idHints: ['1014030347102588969', '1014036569079951381'],
      }
    );
  }
}
