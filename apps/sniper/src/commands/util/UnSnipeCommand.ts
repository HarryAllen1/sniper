import { ContextMenuInteraction, Message } from 'discord.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import { snipes, unSnipes } from './snipes.js';

export default class UnSnipeCommand extends BaseCommand {
  constructor() {
    super(
      'unsnipe',
      'util',
      [],
      1000,
      'The author of the sniped message can delete the snipe with this command.',
      {
        tip: 'You can also use this command by context menus. Right click/long press the message, click apps, and click `unsnipe`.',
      }
    );
  }

  async run(client: DiscordClient, message: Message) {
    const snipe = unSnipes[message.channelId]?.msg;
    if (!snipe) {
      reply(message, {
        title:
          'This snipe does not exist. This usually happens after a bot restart.',
        color: 'RED',
      });
      return;
    }
    const msgToDelete = message.channel?.messages.cache.get(snipe?.id);
    if (
      msgToDelete &&
      snipe &&
      (message.author.id === snipes[message.channel.id].author?.id ||
        message.author.id === snipes[message.channel.id].requesterId)
    ) {
      await msgToDelete.delete();
      delete snipes[message.channel.id];
    }
  }

  override async contextMenuRun(
    client: DiscordClient,
    interaction: ContextMenuInteraction
  ) {
    if (interaction.isMessageContextMenu()) {
      if (interaction.targetMessage.author.id !== client.user?.id)
        return interaction.reply({
          embeds: [
            {
              title: "This command must be used on one of Sniper's messages.",
              color: 'RED',
            },
          ],
          ephemeral: true,
        });
      const snipe = unSnipes[interaction.channelId]?.msg;
      if (!snipe) {
        interaction.reply({
          embeds: [
            {
              title:
                'This snipe does not exist. This usually happens after a bot restart.',
              color: 'RED',
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
        // const originalCmd = snipes[interaction.channelId].message;
        delete snipes[interaction.channelId];

        // if (
        //   (<TextChannel>interaction.channel)
        //     // eslint-disable-next-line -- it exists
        //     .permissionsFor(interaction.guild!.me!)
        //     .has(PermissionFlagsBits.ManageMessages)
        // ) {
        //   const msg = <Message>await interaction.reply({
        //     embeds: [
        //       {
        //         title: 'Snipe deleted.',
        //         description:
        //           'Would you like to also delete the original command?',
        //       },
        //     ],
        //     ephemeral: true,
        //     fetchReply: true,
        //     components: [
        //       new MessageActionRow().addComponents(
        //         new MessageButton()
        //           .setStyle('PRIMARY')
        //           .setLabel('Yes')
        //           .setCustomId('yes')
        //       ),
        //     ],
        //   });
        //   const collector = msg.createMessageComponentCollector({
        //     componentType: 'BUTTON',
        //   });
        //   collector.on('collect', (c) => {
        //     if (c.customId === 'yes') {
        //       originalCmd?.delete();
        //     }
        //   });
        // } else
        return interaction.reply({
          embeds: [
            {
              title: 'Deleted Snipe',
              // description:
              //   'Could not delete original command because of missing permissions.',
            },
          ],
          ephemeral: true,
        });
      }
    }
  }
}
