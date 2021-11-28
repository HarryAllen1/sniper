import {
  EmbedField,
  Message,
  MessageActionRow,
  MessageButton,
} from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import axios from 'axios';
import { TeamSeasLBRes } from '../../typings/types';
import { reply } from '../../utils/helpers/reply';

export default class TeamSeasLbCommand extends BaseCommand {
  constructor() {
    super(
      'teamseaslb',
      'team seas',
      ['tslb'],
      10000,
      'Shows the people who donated the most towards team seas.'
    );
  }

  async run(client: DiscordClient, message: Message) {
    message.channel.sendTyping();
    const res = await axios.get<TeamSeasLBRes>(
      'https://tscache.com/lb_recent.json'
    );
    const body = res.data;
    const currentIndex = 0;
    const maxIndex = 10;
    const fields: EmbedField[] = [];
    if (currentIndex <= maxIndex) {
      body.most.forEach((item, i) => {
        if (i < maxIndex)
          fields.push({
            name: `${item.name} ${item.team_name ? `[${item.team_name}]` : ''}`,
            value: `${item.pounds} pounds${item.message_public ? ': ' : ''}${
              item.message_public
            }`,
            inline: true,
          });
      });
    }
    reply(
      message,
      {
        title: 'Team Seas',
        fields,
        color: 'BLUE',
      },
      {
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel('Donate Now!')
              .setURL('https://teamseas.org/')
              .setStyle('LINK')
          ),
        ],
      }
    );
  }
}
