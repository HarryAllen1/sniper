import type { GuildMember, Message, TextChannel } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import Command from '../../utils/structures/BaseCommand.js';

export default class KickCommand extends Command {
  constructor() {
    super('kick', 'moderation', [], 100, 'Kicks a user/users', {
      permissions: ['KICK_MEMBERS'],
      argsDescription: '<user (user mention or username or id)> ....',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const users: GuildMember[] = [];
    if (!message.member?.permissions.has('KICK_MEMBERS')) {
      reply(message, {
        title: 'really?',
        description: 'You do not have the `KICK_MEMBERS` permission.',
        color: 'RED',
      });
      return;
    }
    if (
      !message.guild?.me?.permissions.has('KICK_MEMBERS') ||
      !(message.channel as TextChannel)
        .permissionsFor(message.guild.me)
        .has('KICK_MEMBERS')
    ) {
      reply(message, {
        title: 'I do not have the `KICK_MEMBERS` permission.',
        color: 'RED',
      });
      return;
    }
    for (const arg of args) {
      const user =
        message.mentions.members?.first() ||
        message.guild?.members.cache.find(
          (member) => member.user.username.toLowerCase() === arg.toLowerCase()
        ) ||
        message.guild?.members.cache.find(
          (member) => member.nickname?.toLowerCase() === arg.toLowerCase()
        ) ||
        message.guild?.members.cache.find((member) =>
          (member.user.username ?? member.nickname)
            .toLowerCase()
            .includes(arg.toLowerCase())
        ) ||
        message.guild?.members.cache.get(arg);

      if (!user) {
        message.channel.send(`Couldn't find user ${arg} in this server.`);
        return;
      } else {
        users.push(user);
      }
    }
    users.forEach((user) => {
      user.kick();
    });
  }
}
