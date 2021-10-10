import {
  Emoji,
  GuildEmoji,
  PartialUser,
  ReactionEmoji,
  User,
} from 'discord.js';

export type UniversalEmoji = GuildEmoji | ReactionEmoji | Emoji;
interface SnipeContent {
  author?: User;
  content?: string;
  createdAt: number | null;
  id?: string;
  emoji?: UniversalEmoji;
  messageURL?: string;
  user?: User | PartialUser;
}

interface Snipe {
  [channelId: string]: SnipeContent;
}

export let snipes: Snipe = {};
export let editSnipes: Snipe = {};
export let reactionSnipes: Snipe = {};
