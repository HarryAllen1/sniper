import { REST } from '@discordjs/rest';
import { green } from 'colorette';
import { Routes } from 'discord-api-types/v10';
import type DiscordClient from '../client/client.js';
import { slappeyJSON } from '../sniper.js';
import { commands } from '../utils/commands.js';
import { log } from '../utils/helpers/console.js';
import { unsnipeContextMenu } from '../utils/interactions.js';
import BaseEvent from '../utils/structures/BaseEvent.js';

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

    const rest = new REST({ version: '10' }).setToken(slappeyJSON.token);
    await rest
      .put(Routes.applicationCommands(client.user?.id ?? ''), {
        body: [unsnipeContextMenu],
      })
      .catch((e) => console.log(`Failure to register interactions:\n${e}`));

    // await rest
    //   .put(Routes.applicationCommands(slappeyJSON.clientID), {
    //     body: interactions,
    //   })
    //   .then(() => {
    //     console.log('globally registered commands');
    //   });
    // await rest
    //   .put(
    //     Routes.applicationGuildCommands(
    //       slappeyJSON.clientID,
    //       '892256861947064341'
    //     ),
    //     {
    //       body: interactions,
    //     }
    //   )
    //   .then(() => console.log('registered commands in test server'));
    for (const command of commands) {
      console.log('creating command from command: ' + command.command.name);
      if (command.guildIds)
        command.guildIds.forEach((guildId) => {
          client.guilds.cache.get(guildId)?.commands.create(command.command);
        });
      else client.application?.commands.create(command.command);
    }
  }
}
