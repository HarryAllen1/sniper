import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { prefixes } from '../../../slappey.json';
import { SlashCommandBuilder } from '@discordjs/builders';

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

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.reply(prefixes.map((val) => `\`${val}\``).toString());
  }
}
