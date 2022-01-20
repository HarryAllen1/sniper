import { Message, MessageActionRow, MessageButton } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';

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
    const res = await fetch('https://tscache.com/donation_total.json');
    const total: any = {};
    total.data = await res.json();
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
