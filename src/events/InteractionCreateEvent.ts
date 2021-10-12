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
      } else {
        interaction.reply({
          ephemeral: true,
          embeds: [
            {
              title: "It's not your command.",
              description:
                "If this is by some chance your command, run your previous command again. No, this isn't a bug.",
              color: 'RED',
            },
          ],
        });
      }
    }
  }
}
