import { Interaction } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent.js';
import DiscordClient from '../client/client.js';
import { helpCommandHelper } from '../utils/registry.js';

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client: DiscordClient, interaction: Interaction) {
    if (interaction.isMessageComponent()) {
      if (interaction.isSelectMenu()) {
        if (interaction.customId === 'categorySelect') {
          const [category] = interaction.values;

          const descriptions = helpCommandHelper[category].commands;

          await interaction.update({
            embeds: [
              {
                title: category,
                description:
                  'Key:\n[argument]: Optional argument\n<argument>: Required argument\n[argument] <argument>: If the first argument is specified, the second argument MUST be specified.',
                fields: descriptions,
                color: 'WHITE',
              },
            ],
          });
        }
      }
    }
  }
}
