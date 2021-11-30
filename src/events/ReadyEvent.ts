import BaseEvent from '../utils/structures/BaseEvent.js';
import DiscordClient from '../client/client.js';
import { log } from '../utils/helpers/console.js';
// import { REST } from '@discordjs/rest';
// import { Routes } from 'discord-api-types/v9';
// import { slashCommands } from '../utils/registry';
// import { clientID, token } from '../../slappey.json';

import chalk from 'chalk';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client: DiscordClient) {
    log(
      chalk.green(`Logged in as ${client.user?.tag}.`),
      chalk.green(`Ready in ${client.guilds.cache.size} guilds`)
    );

    client.user?.setActivity({
      name: '$help',
      type: 'WATCHING',
    });

    // const rest = new REST({ version: '9' }).setToken(token);

    // await rest
    //   .put(Routes.applicationCommands(clientID), { body: slashCommands })
    //   .then(() => {
    //     console.log('globally registered commands');
    //   });
  }
}
