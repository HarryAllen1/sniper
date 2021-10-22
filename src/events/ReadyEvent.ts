import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { log } from '../utils/helpers/console';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { slashCommands } from '../utils/registry';
import { clientID, token } from '../../slappey.json';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client: DiscordClient) {
    log(`Logged in as ${client.user?.tag}.`);
    client.user?.setActivity({
      name: 'deleted messages',
      type: 'WATCHING',
    });
    // const rest = new REST({ version: '9' }).setToken(token);
    // await rest
    //   .put(Routes.applicationGuildCommands(clientID, '892256861947064341'), {
    //     body: slashCommands,
    //   })
    //   .then(() => {
    //     console.log('registered commands for guild 892256861947064341');
    //   });
    // // await rest
    // //   .put(Routes.applicationGuildCommands(clientID, '893350150209171476'), {
    // //     body: slashCommands,
    // //   })
    // //   .then(() => {
    // //     console.log('registered commands for guild 893350150209171476');
    // //   });

    // await rest.put(
    //   Routes.applicationGuildCommands(clientID, '882695828140073052'),
    //   { body: slashCommands }
    // );
    // rest
    //   .put(Routes.applicationCommands(clientID), { body: slashCommands })
    //   .then(() => {
    //     console.log('globally registered commands');
    //   });
  }
}
