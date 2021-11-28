// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
import { Guild } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { log } from '../../utils/helpers/console';
import chalk from 'chalk';

export default class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }

  async run(client: DiscordClient, guild: Guild) {
    log(
      chalk.redBright(
        `Left server ${guild.name}. Now in ${client.guilds.cache.size} guilds.`
      )
    );
  }
}
