import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Colors } from 'discord.js';
import { getRandomNumber } from '../../lib/index.js';

@ApplyOptions<Command.Options>({
  description: 'Flips a coin!',
})
export class UserCommand extends Command {
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (b) =>
        b
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((i) =>
            i
              .setName('choice')
              .setDescription('What to guess')
              .setRequired(false)
              .setChoices(
                { name: 'heads', value: 'heads' },
                { name: 'tails', value: 'tails' }
              )
          ),
      {
        idHints: ['1014030343432577024'],
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const chosen = getRandomNumber(0, 1) === 0 ? 'heads' : 'tails';

    if (interaction.options.getString('choice', false)) {
      const win =
        interaction.options.getString('choice', false)?.toLowerCase() ===
        chosen;
      await interaction.reply({
        embeds: [
          {
            title: `You ${win ? 'won' : 'lost'}!`,
            description: `You flipped a coin and got **${chosen}**!`,
            color: win ? Colors.Green : Colors.Red,
          },
        ],
      });
    } else {
      await interaction.reply({
        embeds: [
          {
            title: `You flipped a coin and got **${chosen}**!`,
          },
        ],
      });
    }
  }
}
