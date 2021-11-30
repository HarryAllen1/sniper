import { GuildMember, Message, User } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand.js';
import DiscordClient from '../../client/client.js';
import { reply } from '../../utils/helpers/reply.js';
import { capitalizeFirstLetter } from '../../utils/helpers/string.js';
import {
  getMentionedMember,
  getMentionedUser,
} from '../../utils/helpers/mention.js';

export default class WhoisCommand extends BaseCommand {
  constructor() {
    super('whois', 'util', [], 3000, 'shows info about a user');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const user: User = getMentionedUser(message, args); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const member: GuildMember = getMentionedMember(message, args)!;

    if (!user && !member) {
      reply(message, {
        title: "That user doesn't exist",
        description: 'Try mentioning the user',
        color: 'RED',
      });
      return;
    }

    if (!message.guild?.members.cache.has(user.id)) {
      reply(message, {
        title: 'That user is not in this server',
        description:
          'Make sure that user is in that server before using this command.',
        color: 'RED',
      });
      return;
    }
    const activities = member.presence?.activities;
    let status: string;
    let activity: string;
    activities?.forEach((thing) => {
      if (thing.type === 'CUSTOM') {
        status = thing.state ?? '';
      } else {
        activity = `${capitalizeFirstLetter(thing.type.toLowerCase())} ${
          thing.name
        }${thing.details ? `: ${thing.details}` : ''}. ${
          thing.url ? `[link](${thing.url})` : ''
        }. Started at ${new Date(thing.createdTimestamp)}`;
      }
    });

    reply(message, {
      title: `${user.tag}${member.nickname ? `(${member.nickname})` : ''}`,
      thumbnail: {
        url:
          user.avatarURL({ dynamic: true, format: 'webp' }) ||
          user.defaultAvatarURL,
      },
      fields: [
        {
          name: 'ID',
          value: user.id,
          inline: true,
        },
        {
          name: 'Avatar',
          value: `[Link](${
            user.avatarURL({ dynamic: true, format: 'webp' }) ||
            user.defaultAvatarURL
          })`,
          inline: true,
        },
        {
          name: 'Account Created',
          value: new Date(user.createdTimestamp).toUTCString(),
          inline: true,
        },
        {
          name: 'Account Age',
          value: new Date(Date.now() - user.createdTimestamp)
            .toISOString()
            .slice(11, -1),
          inline: true,
        },
        {
          name: 'Joined Server At',
          value: member.joinedAt?.toUTCString() || "Couldn't get info",
          inline: true,
        },
        {
          name: 'Join Server Age',
          value: new Date(Date.now() - (member.joinedAt?.getTime() ?? 0))
            .toISOString()
            .slice(11, -1),
        },
        {
          name: 'Status',
          value:
            // @ts-ignore what is the compiler on?
            status ||
            "Has no active status, is invisible/offline or is not in the bot's cache.",
          inline: true,
        },
        {
          name: 'Activity',
          // @ts-ignore
          value: activity || 'No activity',
          inline: true,
        },
        {
          name: 'Display Color',
          value: member.displayHexColor,
          inline: true,
        },
        {
          name: 'Permissions',
          value: member.permissions
            .toArray(true)

            .map((val) => `\`${val}\``)
            .toString(),
          inline: false,
        },
        {
          name: 'Roles',
          value: member.roles.cache
            .sort((f, s) => s.position - f.position)
            .map((val) => `${val}`)
            .toString(),
          inline: true,
        },
        // {
        //   name: 'Banner',
        //   value: `[Link](${user.})`,
        //   inline: true,
        // },
      ],
    });
  }
}
