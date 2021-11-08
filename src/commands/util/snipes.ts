import {
  Emoji,
  GuildEmoji,
  Message,
  PartialUser,
  ReactionEmoji,
  User,
} from 'discord.js';
import admin from 'firebase-admin';
const db = admin.firestore();

export type UniversalEmoji = GuildEmoji | ReactionEmoji | Emoji;
interface SnipeContent {
  author?: User;
  content?: string;
  createdAt: number | null;
  attachment?: string;
  id?: string;
  emoji?: UniversalEmoji;
  messageURL?: string;
  user?: User | PartialUser;
}

export interface Snipe {
  [channelId: string]: SnipeContent;
}
interface UnSnipe {
  [channelID: string]: UnSnipeContent;
}
interface UnSnipeContent {
  [msg: string]: Message;
}

export let snipes: Snipe = {};
export let editSnipes: Snipe = {};
export let reactionSnipes: Snipe = {};
export let unSnipes: UnSnipe = {};

export const setSnipe = (snipe: Snipe) =>
  db.collection('snipes').doc('snipes').set(snipe, { merge: true });
export const getSnipes = (
  channelID?: string
): Promise<FirebaseFirestore.DocumentSnapshot<Snipe>> =>
  db.collection('snipes').doc('snipes').get();
