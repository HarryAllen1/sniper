import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class GiveCommand extends BaseCommand {
  constructor() {
    super(
      'give',
      'currency',
      [],
      5000,
      'Gives some coins to a specified user',
      { argsDescription: '<user ID or mentioned user> <amount of coins>' }
    );
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('give command works');
  }
}
