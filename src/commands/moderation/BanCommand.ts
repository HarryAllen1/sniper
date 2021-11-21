import { GuildMember, Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { reply } from '../../utils/helpers/reply';

export default class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', [], 100, 'Bans any amount of members.', {
      argsDescription: '<@user or userID> <user> <user> ...',
    });
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const users: GuildMember[] = [];
    if (!message.member?.permissions.has('BAN_MEMBERS')) {
      reply(message, {
        title: 'really?',
        description: 'You do not have the `BAN_MEMBERS` permission.',
        color: 'RED',
      });
      return;
    }
    if (!message.guild?.me?.permissions.has('BAN_MEMBERS')) {
      reply(message, {
        title: 'I do not have the `BAN_MEMBERS` permission.',
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
          (member.nickname || member.user.username)
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
      user.ban();
    });
  }
}
