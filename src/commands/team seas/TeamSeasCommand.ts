import { Message, MessageActionRow, MessageButton } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { default as axios } from 'axios';
import { reply } from '../../utils/helpers/reply.js';

export default class TeamSeasCommand extends BaseCommand {
  constructor() {
    super(
      'teamseas',
      'team seas',
      ['ts', 'tst', 'teamseastotal'],
      10000,
      'Shows the amount donated to team seas'
    );
  }

  async run(client: DiscordClient, message: Message) {
    const total = await axios.get<{ count: string }>(
      'https://tscache.com/donation_total.json'
    );
    reply(
      message,
      {
        title: 'Team Seas Has Donated $' + total.data.count,
        description: 'Donate to the cause!',
        color: 'BLUE',
      },
      {
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setStyle('LINK')
              .setURL('https://teamseas.org/')
              .setLabel('Donate Here!')
          ),
        ],
      }
    );
  }
}
