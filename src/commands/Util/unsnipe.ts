import { ApplyOptions, RequiresGuildContext } from '@sapphire/decorators';
import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import {
  ApplicationCommandType,
  Colors,
  ContextMenuCommandInteraction,
  Message,
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
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .setDMPermission(false),
      {
        idHints: ['1014030176352477225', '1014592801066975312'],
      }
    );

    registry.registerContextMenuCommand(
      (b) =>
        b
          .setName('unsnipe')
          .setType(ApplicationCommandType.Message)
          .setDMPermission(false),
      {
        idHints: ['1014030258133016677', '1014592880570007633'],
      }
    );
  }

  @RequiresGuildContext((i: { reply: (r: string) => Promise<Message> }) =>
    i.reply('This command can only be used in a guild.')
  )
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
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
      (interaction.user.id === snipes[interaction.channelId].user?.id ||
        interaction.user.id === snipes[interaction.channelId].requesterId)
    ) {
      await msgToDelete.delete();
      delete snipes[interaction.channelId];
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

        delete snipes[interaction.channelId];

        interaction.reply({
          embeds: [
            {
              title: 'Deleted Snipe',
            },
          ],
          ephemeral: true,
        });
      }
    }
  }
}
