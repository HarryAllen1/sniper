// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
import { GuildMemberRoleManager, Interaction } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent.js';
import DiscordClient from '../client/client.js';

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client: DiscordClient, interaction: Interaction) {
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
          (<GuildMemberRoleManager>interaction.member?.roles).remove(
            '966129132566093955'
          );
          interaction.reply('Added role `Random shit ping`');
        } else {
          (<GuildMemberRoleManager>interaction.member?.roles).add(
            '966129132566093955'
          );
          interaction.reply('Removed role `Random shit ping`');
        }
      }
    }
  }
}
