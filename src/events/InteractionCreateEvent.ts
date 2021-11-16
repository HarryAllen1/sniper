import {
  GuildMemberRoleManager,
  Interaction,
  Message,
  MessageComponentInteraction,
} from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { helpCommandHelper } from '../utils/registry';

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client: DiscordClient, interaction: Interaction) {
    // if (
    //   interaction.isButton() &&
    //   interaction.message.id === '909518647037415434'
    // ) {
    //   // interaction.deferReply();
    //   const roles = [
    //     'Mountbatten Pink',
    //     'Vermilion',
    //     'Celadon',
    //     'Skobeloff',
    //     'Burlywood',
    //     'Jazzberry Jam',
    //     'Lusty Gallant',
    //     'Coquelicot',
    //     'Caput Mortuum',
    //     'Razzmatazz',
    //     'Phlox',
    //     'Gamboge',
    //     'Gingerline',
    //     'Feldgrau',
    //     'Viridian',
    //     'Forest Green',
    //     'Amaranth',
    //     'Falu',
    //     'Drunk-Tank Pink',
    //     'Milk and Water',
    //   ];

    //   roles.forEach((v) => {
    //     const role = interaction.guild!.roles.cache.find((r) => r.name === v);
    //     if (
    //       (interaction.member?.roles as GuildMemberRoleManager).cache.has(
    //         role?.id!
    //       )
    //     ) {
    //       try {
    //         // @ts-ignore
    //         interaction.member!.roles.remove(role);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //     if (role) {
    //       try {
    //         // @ts-ignore
    //         interaction.message.member!.roles.add(role);
    //         interaction.reply({
    //           content: `Added role ${role.name}`,
    //           ephemeral: true,
    //         });
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   });
    // }
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command?.slashCommand) {
        // console.log(interaction);
        command.run(client, interaction, interaction.options as any);
      }
    } else if (interaction.isMessageComponent()) {
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
