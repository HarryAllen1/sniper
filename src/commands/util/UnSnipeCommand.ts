import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { snipes, unSnipes } from './snipes';

export default class UnSnipeCommand extends BaseCommand {
  constructor() {
    super(
      'unsnipe',
      'util',
      [],
      1000,
      'The author of the sniped message can delete the snipe with this command.'
    );
  }

  async run(client: DiscordClient, message: Message) {
    const snipe = unSnipes[message.channel.id]?.msg;
    const msgToDelete = message?.channel?.messages?.cache?.get(snipe.id);
    if (
      msgToDelete &&
      snipe &&
      message.author.id === snipes[message.channel.id].author?.id
    ) {
      msgToDelete.delete();
    }
  }
}
