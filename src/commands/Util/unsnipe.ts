import { ApplyOptions, RequiresGuildContext } from '@sapphire/decorators';
import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  ComponentType,
  ContextMenuCommandInteraction,
  MessageActionRowComponentBuilder,
  PermissionFlagsBits,
  TextChannel,
} from 'discord.js';
import { snipes, unSnipes } from '../../lib/snipes.js';

@ApplyOptions<Command.Options>({
  name: 'unsnipe',
  cooldownDelay: 1000,
  description:
    'The author of the sniped message can delete the snipe with this command.',
})
export class UserCommand extends Command {
  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder.setName(this.name).setDescription(this.description)
    );

    registry.registerContextMenuCommand((b) =>
      b.setName('unsnipe').setType(ApplicationCommandType.Message)
    );
  }

  @RequiresGuildContext((i) => {
    i.reply('This command can only be used in a guild.');
  })
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const channel = interaction.channel as TextChannel;
    const snipe = unSnipes[interaction.channelId]?.msg;
    if (!snipe) {
      return interaction.reply({
        embeds: [
          {
            title:
              'This snipe does not exist. This usually happens after a bot restart.',
            color: Colors.Red,
          },
        ],
      });
    }
    const msgToDelete = interaction.channel?.messages.cache.get(snipe?.id);
    if (
      msgToDelete &&
      snipe &&
      (interaction.user.id === snipes[channel.id].user?.id ||
        interaction.user.id === snipes[channel.id].requesterId)
    ) {
      await msgToDelete.delete();
      delete snipes[channel.id];
    }
  }

  public override async contextMenuRun(
    interaction: ContextMenuCommandInteraction
  ) {
    if (interaction.isMessageContextMenuCommand()) {
      if (
        interaction.targetMessage.author.id !== this.container.client.user?.id
      )
        return interaction.reply({
          embeds: [
            {
              title: "This command must be used on one of Sniper's messages.",
              color: Colors.Red,
            },
          ],
          ephemeral: true,
        });
      const snipe = unSnipes[interaction.channelId]?.msg;
      if (!snipe) {
        await interaction.reply({
          embeds: [
            {
              title:
                'This snipe does not exist. This usually happens after a bot restart.',
              color: Colors.Red,
            },
          ],
          ephemeral: true,
        });
        return;
      }
      const msgToDelete = interaction.channel?.messages.cache.get(snipe?.id);
      if (
        msgToDelete &&
        snipe &&
        (interaction.user.id === snipes[interaction.channelId].author?.id ||
          interaction.user.id === snipes[interaction.channelId].requesterId)
      ) {
        await msgToDelete.delete();
        const originalCmd = await interaction.channel?.messages.fetch(
          snipes[interaction.channelId]?.cmdId
        );
        delete snipes[interaction.channelId];

        if (
          (<TextChannel>interaction.channel)
            // eslint-disable-next-line -- it exists
            .permissionsFor(interaction.guild!.members.me!)
            .has(PermissionFlagsBits.ManageMessages)
        ) {
          const msg = await interaction.reply({
            embeds: [
              {
                title: 'Snipe deleted.',
                description:
                  'Would you like to also delete the original command?',
              },
            ],
            ephemeral: true,
            fetchReply: true,
            components: [
              new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setLabel('Yes')
                  .setCustomId('yes')
              ),
            ],
          });
          const collector = msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
          });
          collector.on('collect', async (c) => {
            if (c.customId === 'yes') {
              await originalCmd
                ?.delete()
                .catch(() =>
                  c.reply({
                    content: 'Error deleting command',
                    ephemeral: true,
                  })
                )
                .then(async () => {
                  await c.reply({
                    content: 'Command deleted.',
                    ephemeral: true,
                  });
                });
            }
          });
        } else
          return interaction.reply({
            embeds: [
              {
                title: 'Deleted Snipe',
                description:
                  'Could not delete original command because of missing permissions.',
              },
            ],
            ephemeral: true,
          });
      }
    }
  }
}
