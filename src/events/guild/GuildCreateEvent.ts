// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild, MessageActionRow, MessageButton } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent.js';
import DiscordClient from '../../client/client.js';
import { log } from '../../utils/helpers/console.js';
import chalk from 'chalk';

export default class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }

  async run(client: DiscordClient, guild: Guild) {
    client.user?.setActivity({
      name: `$help in ${client.guilds.cache.size} servers`,
      type: 'WATCHING',
    });
    client.users.cache
      .get('696554549418262548')
      ?.send(
        'Joined new guild. Now in ' + client.guilds.cache.size + ' guilds.'
      );
    log(
      chalk.green(
        `Joined guild ${guild.name}. Now in ${client.guilds.cache.size} guilds.`
      )
    );
    if (
      guild.systemChannel &&
      guild.me?.permissions.has('SEND_MESSAGES') &&
      guild.me?.permissions.has('VIEW_CHANNEL') &&
      guild.systemChannel?.permissionsFor(guild.me).has('SEND_MESSAGES') &&
      guild.systemChannel?.permissionsFor(guild.me).has('VIEW_CHANNEL')
    ) {
      const msg = await guild.systemChannel?.send({
        embeds: [
          {
            title: 'Hello, I am Sniper',
            description:
              'A general purpose Discord bot. Includes snipe, edit snipe, and reaction snipe commands.',
            color: 'RANDOM',
            fields: [
              {
                name: 'Prefix:',
                value: '`$` or `%`',
              },
              {
                name: 'Help Command:',
                value: '`$help` or `%help`',
              },
            ],
          },
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setEmoji('❌')
              .setCustomId('remove')
              .setStyle('PRIMARY')
          ),
        ],
      });
      msg
        .createMessageComponentCollector({ componentType: 'BUTTON' })
        .on('collect', (i) => {
          i.deferUpdate();
          if (!i.memberPermissions?.has('MANAGE_MESSAGES'))
            return i.reply({
              content:
                'You cannot delete this messages since you dont have the manage messages permission.',
              ephemeral: true,
            });
          else {
            msg.delete();
          }
        });
    }
  }
}
