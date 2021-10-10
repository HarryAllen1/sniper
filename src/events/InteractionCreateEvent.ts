// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
import { Interaction, MessageComponentInteraction } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { helpCommandHelper } from '../utils/registry';

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client: DiscordClient, interaction: Interaction) {
    if (interaction.isMessageComponent()) {
      const originalMessageId = (interaction as MessageComponentInteraction) // @ts-ignore
        .message.reference.messageId;

      if (
        interaction.channel?.messages.cache.get(originalMessageId)?.author
          .id === interaction.member?.user.id
      ) {
        if (interaction.isSelectMenu()) {
          if (interaction.customId === 'categorySelect') {
            const [category] = interaction.values;

            const descriptions = helpCommandHelper[category].commands;

            console.log(descriptions);

            await interaction.update({
              // @ts-ignore
              embeds: [{ title: category, fields: descriptions }],
            });
          }
        }
      } else {
        interaction.reply({
          ephemeral: true,
          embeds: [{ title: "It's not your command.", color: 'RED' }],
        });
      }
    }
  }
}
