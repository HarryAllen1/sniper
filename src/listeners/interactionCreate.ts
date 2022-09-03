import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener } from '@sapphire/framework';
import { GuildMemberRoleManager, Interaction } from 'discord.js';

@ApplyOptions<Listener.Options>({
  event: Events.InteractionCreate,
})
export class UserListener extends Listener<typeof Events.InteractionCreate> {
  public async run(interaction: Interaction) {
    if (interaction.isButton()) {
      if (
        interaction.customId === 'pingRole' &&
        interaction.guildId === '882695828140073052'
      ) {
        if (
          (<GuildMemberRoleManager>interaction.member?.roles).cache.has(
            '966129132566093955'
          )
        ) {
          await (<GuildMemberRoleManager>interaction.member?.roles).remove(
            '966129132566093955'
          );
          await interaction.reply({
            content: 'Removed role `Random shit ping`',
            ephemeral: true,
          });
        } else {
          await (<GuildMemberRoleManager>interaction.member?.roles).add(
            '966129132566093955'
          );
          await interaction.reply({
            content: 'Added role `Random shit ping`',
            ephemeral: true,
          });
        }
      }
    }
  }
}
