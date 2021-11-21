import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

import { SlashCommandBuilder } from '@discordjs/builders';
import { reply } from '../../utils/helpers/reply';

export default class PrefixCommand extends BaseCommand {
  constructor() {
    super(
      'prefix',
      'general',
      ['prefixes'],
      5000,
      'shows the prefixes that this bot has'
    );
  }

  slashCommand = new SlashCommandBuilder()
    .setName('prefix')
    .setDescription(
      "Shows the prefixes of this bot since most of its commands aren't slash commands."
    )
    .toJSON();

  async run(client: DiscordClient, message: Message) {
    const { prefixes } = __filename.endsWith('.ts')
      ? await import('../../../slappey.json')
      : await import('../../../slappey-prod.json');
    reply(message, {
      title: 'Prefixes',
      description: prefixes.map((val) => `\`${val}\``).toString(),
    });
  }
}
