import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class InviteCommand extends BaseCommand {
  constructor() {
    super('invite', 'general', [], 1000, 'Gives an invite link for this bot');
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.send(
      'https://discord.com/api/oauth2/authorize?client_id=893619442712444970&permissions=533112155862&scope=bot%20applications.commands'
    );
  }
}
