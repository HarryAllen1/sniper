import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { getRandomNumber } from '../../utils/helpers/randomNumber.js';
import Command from '../../utils/structures/BaseCommand.js';

// mv line`const win = whatever to else4 block

export default class CoinflipCommand extends Command {
  constructor() {
    super('coinflip', 'general', [], 500, 'Flips a coin', {
      argsRequired: false,
      argsDescription: '[heads or tails]',
    });
  }

  public async registerApplicationCommands(
    client: DiscordClient,
    registry: Command.CommandsRegistry
  ) {
    registry.registerChatInputCommand((b) =>
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
        )
    );
  }

  public async chatInputRun(
    client: DiscordClient,
    interaction: Command.CommandInteraction
  ) {
    const chosen = getRandomNumber(0, 1) === 0 ? 'heads' : 'tails';
    const win = interaction.options.getString('choice', false) === chosen;

    if (!interaction.options.getString('choice', false)) {
      await interaction.reply({
        embeds: [
          {
            title: `You flipped a coin and got **${chosen}**!`,
          },
        ],
      });
      return;
    } else {
      await interaction.reply({
        embeds: [
          {
            title: `You ${win ? 'won' : 'lost'}!`,
            description: `You flipped a coin and got **${chosen}**!`,
            color: win ? 'GREEN' : 'RED',
          },
        ],
      });
      return;
    }
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const chosen = getRandomNumber(0, 1) === 0 ? 'heads' : 'tails';

    if (!args[0]) {
      await reply(message, {
        title: `You flipped a coin and got **${chosen}**!`,
      });
      return;
    } else {
      const win = args[0].toLowerCase() === chosen;
      await reply(message, {
        title: `You ${win ? 'won' : 'lost'}!`,
        description: `You flipped a coin and got **${chosen}**!`,
        color: win ? 'GREEN' : 'RED',
      });
      return;
    }
  }
}
