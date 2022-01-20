import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { Paginator } from '../../utils/helpers/paginator.js';

export default class PaginatorCommand extends BaseCommand {
  constructor() {
    super('paginator', 'test', [], 500, '', {
      disabled: true,
    });
  }

  async run(client: DiscordClient, message: Message) {
    const paginator = new Paginator([
      { embeds: [{ title: 'test' }] },
      { content: 'hi' },
    ]);
    await paginator.start({ message });
  }
}
