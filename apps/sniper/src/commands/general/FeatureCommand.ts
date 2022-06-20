import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { BaseCommand } from '../../utils/structures/BaseCommand.js';

export default class FeatureCommand extends BaseCommand {
  constructor() {
    super(
      'feature',
      'general',
      ['requestfeature', 'featurerequest'],
      900000,
      'Requests a feature',
      {
        argsDescription: '<feature>: The requested bot feature.',
      }
    );
  }

  async run(client: DiscordClient, message: Message) {
    reply(message, {
      title: 'Feature request',
      description:
        'Head to this page (it\'s this bots Github repo): https://github.com/MajesticString/sniper/issues\nHit new issue, and title it "Feature: (one sentence description)"\nIn the description, detail what the feature is.',
    });
  }
}
