import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/reply.js';

export default class CreateIssueCommand extends BaseCommand {
  constructor() {
    super(
      'createissue',
      'general',
      ['issue', 'createproblem', 'problem'],
      900000,
      'Submits an issue for this bot.',
      {
        argsDescription: '<issue>: The issue with the bot.',
      }
    );
  }

  async run(client: DiscordClient, message: Message) {
    reply(message, {
      title: 'Create an issue',
      description:
        'Head to this page (it\'s this bots Github repo): https://github.com/MajesticString/sniper/issues\nHit new issue, and title it "(one sentence description)"\nIn the description, detail what the issue is. Be sure to include how to reproduce it.',
    });
  }
}
