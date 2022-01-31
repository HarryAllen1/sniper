import { GuildMember, Message, User } from 'discord.js';
import { client } from '../../sniper.js';

export const getMentionedUser = (message: Message, args: string[]): User => {
  return (
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.guild?.members.cache.get(args[0])?.user ||
    message.guild?.members.cache.find(
      (member) =>
        member.displayName.toLowerCase() === args.join(' ').toLowerCase()
    )?.user ||
    client.users.cache.find(
      (user) => user.tag.toLowerCase() === args.join(' ').toLowerCase()
    ) ||
    message.author
  );
};
export const getMentionedMember = (
  message: Message,
  args: string[]
): GuildMember | null => {
  return (
    message.mentions.members?.first() ||
    message.guild?.members.cache.get(args[0]) ||
    message.guild?.members.cache.find(
      (member) =>
        member.displayName.toLowerCase() === args.join(' ').toLowerCase()
    ) ||
    message.member
  );
};
