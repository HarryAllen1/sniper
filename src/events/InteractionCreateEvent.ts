import { Interaction, Message, MessageComponentInteraction } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { helpCommandHelper } from '../utils/registry';

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client: DiscordClient, interaction: Interaction) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command?.slashCommand) {
        // console.log(interaction);
        command.run(client, interaction, interaction.options);
      }
    } else if (interaction.isMessageComponent()) {
      if (interaction.isSelectMenu()) {
        if (interaction.customId === 'categorySelect') {
          const [category] = interaction.values;

          const descriptions = helpCommandHelper[category].commands;

          await interaction.update({
            // @ts-ignore
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
