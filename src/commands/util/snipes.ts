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

export const snipes: Snipe = {};
export const editSnipes: Snipe = {};
export const reactionSnipes: Snipe = {};
export const unSnipes: UnSnipe = {};

export const setSnipe = (snipe: Snipe) =>
  db.collection('snipes').doc('snipes').set(snipe, { merge: true });
export const getSnipes = (): Promise<
  FirebaseFirestore.DocumentSnapshot<Snipe>
> => db.collection('snipes').doc('snipes').get();
