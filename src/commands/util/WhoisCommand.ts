import { GuildMember, Message, User } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';
import { capitalizeFirstLetter } from '../../utils/helpers/string';

export default class WhoisCommand extends BaseCommand {
  constructor() {
    super('whois', 'util', [], 3000, 'shows info about a user');
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    let user: User;
    let member: GuildMember;
    if (!args[0]) {
      user = message.author;
      member = message.member!;
    } else {
      if (message.mentions.users.first()) {
        user = message.mentions.users.first()!;
        member = message.mentions.members?.first()!;
      } else if (client.users.cache.get(args[0])) {
        user = client.users.cache.get(args[0])!;
        member = message.guild?.members.cache.get(args[0])!;
      } else {
        reply(message, {
          title: "That user doesn't exist",
          description: 'Try mentioning the user',
          color: 'RED',
        });
        return;
      }
    }
    let activities = member.presence?.activities;
    let status: string;
    let activity: string;
    activities?.forEach((thing) => {
      if (thing.type === 'CUSTOM') {
        status = thing.state!;
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
          value: new Date(Date.now() - member.joinedAt?.getTime()!)
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
