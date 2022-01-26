import BaseEvent from '../utils/structures/BaseEvent.js';
import DiscordClient from '../client/client.js';
import { log } from '../utils/helpers/console.js';
// import { REST } from '@discordjs/rest';
// import { Routes } from 'discord-api-types/v9';
// import { slashCommands } from '../utils/registry';
// import { clientID, token } from '../../slappey.json';

import { green } from 'colorette';
// import { TextChannel } from 'discord.js';
// import { sleep } from '../utils/helpers/misc.js';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client: DiscordClient) {
    log(
      green(`Logged in as ${client.user?.tag}.`),
      green(`Ready in ${client.guilds.cache.size} guilds`)
    );

    client.user?.setActivity({
      // +2 because of a bug. discord count always seems to be 2 higher so idk
      name: `$help in ${client.guilds.cache.size + 2} servers`,
      type: 'WATCHING',
    });

    // const giveawayEnd = 1641960780;
    // const timeLeft = giveawayEnd - Date.now();
    // await sleep(timeLeft);
    // // setTimeout(() => {
    // log('test', timeLeft);
    // (client.channels.cache.get('890058558241116250') as TextChannel)?.send(
    //   (
    //     client.channels.cache.get('890058558241116250') as TextChannel
    //   ).messages.cache
    //     .get('928139226380402688')
    //     ?.reactions.cache.get('🎉')
    //     ?.users.cache.random()
    //     ?.toString() ?? 'Something went wrong'
    // );
    // }, timeLeft);
    // const rest = new REST({ version: '9' }).setToken(token);

    // await rest
    //   .put(Routes.applicationCommands(clientID), { body: slashCommands })
    //   .then(() => {
    //     console.log('globally registered commands');
    //   });
  }
}
