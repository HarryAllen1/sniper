import { Message, MessageActionRow, MessageButton } from 'discord.js';
import ms from 'ms';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import { BaseCommand } from '../../utils/structures/BaseCommand.js';

export default class VoteCommand extends BaseCommand {
  constructor() {
    super('vote', 'general', [], ms('3s'), 'Vote for the bot on top.gg');
  }

  async run(client: DiscordClient, message: Message) {
    reply(
      message,
      {
        title: 'Vote for Sniper',
        fields: [
          {
            name: 'Rewards',
            value: 'Currently no rewards (working on this; will be out soon)',
          },
        ],
        color: 'GREEN',
      },
      {
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setStyle('LINK')
              .setLabel('top.gg')
              .setURL('https://top.gg/bot/893619442712444970/vote'),
            new MessageButton()
              .setStyle('LINK')
              .setLabel('dbl.com')
              .setURL('https://discordbotlist.com/bots/sniper-6531/upvote')
          ),
        ],
      }
    );
  }
}
