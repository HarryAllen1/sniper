import { green } from 'colorette';
import type { DiscordClient } from '../client/client.js';
import { commands } from '../utils/commands.js';
import { log } from '../utils/helpers/console.js';
import { BaseEvent } from '../utils/structures/BaseEvent.js';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client: DiscordClient) {
    log(
      green(`Logged in as ${client.user?.tag}.`),
      green(`Ready in ${client.guilds.cache.size + 2} guilds`)
    );

    client.user?.setActivity({
      // +2 because of a bug. discord count always seems to be 2 higher so idk, its probably correct.
      name: `$help in ${client.guilds.cache.size + 2} servers`,
      type: 'WATCHING',
    });

    for (const command of commands) {
      console.log('creating command from command: ' + command.command.name);
      if (command.guildIds)
        command.guildIds.forEach((guildId) => {
          if (
            client.guilds.cache
              .get(guildId)
              ?.commands.cache.get(command.command.name)
              ?.toJSON() !== command.command
          )
            client.guilds.cache.get(guildId)?.commands.create(command.command);
        });
      else if (
        client.application?.commands.cache
          .get(command.command.name)
          ?.toJSON() !== command.command
      ) {
        client.application?.commands.create(command.command);
      }
    }
  }
}
