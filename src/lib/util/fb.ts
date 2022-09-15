import { container } from '@sapphire/framework';

const { db } = container;

interface GuildSettings {
  snipeDeleteTime?: number;
}

export const getGuildSettings = async (
  guildID: string
): Promise<GuildSettings> => {
  const val = await db.collection('guilds').doc(guildID).get();
  return val.data() as Promise<GuildSettings>;
};
export const setGuildSettings = async (
  guildID: string,
  data: FirebaseFirestore.DocumentData,
  options: FirebaseFirestore.SetOptions = { merge: true }
): Promise<FirebaseFirestore.WriteResult> => {
  return db.collection('guilds').doc(guildID).set(data, options);
};
