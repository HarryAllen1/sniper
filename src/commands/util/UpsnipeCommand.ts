import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class UnsnipeCommand extends BaseCommand {
  constructor() {
    super(
      'unsnipe',
      'util',
      [],
      1000,
      'The author of the sniped message can delete the snipe with this command.'
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {}
}
