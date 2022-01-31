import { Message } from 'discord.js';
import DiscordClient from '../../client/client.js';
import { log } from '../../utils/helpers/console.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
// import { getUserData } from '../../utils/helpers/user.js';
// import { reply } from '../../utils/helpers/reply.js';

export default class UseCommand extends BaseCommand {
  constructor() {
    super('use', 'currency', [], 5000, 'Uses an item');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    log(client.guilds.cache.size, args[0]);
    // const user = await getUserData(message.author.id);
    // const items = user.items;
    // if (items.includes(args[0].toLowerCase())) {
    //   reply(message, { title: `${message.author.username} used ${args[0]}` });
    // } else {
    // }
  }
}
