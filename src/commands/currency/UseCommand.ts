import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getUserData } from '../../utils/helpers/user';
import { reply } from '../../utils/helpers/reply';

export default class UseCommand extends BaseCommand {
  constructor() {
    super('use', 'currency', [], 5000, 'Uses an item');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const user = await getUserData(message.author.id);
    const items = user.items;
    // if (items.includes(args[0].toLowerCase())) {
    //   reply(message, { title: `${message.author.username} used ${args[0]}` });
    // } else {
    // }
  }
}
