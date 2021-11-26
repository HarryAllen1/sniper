// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { log } from '../../utils/helpers/console';
import chalk from 'chalk';

export default class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }

  async run(client: DiscordClient, guild: Guild) {
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
    )
      guild.systemChannel?.send({
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
      });
  }
}
