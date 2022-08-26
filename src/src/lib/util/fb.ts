import { container } from '@sapphire/framework';

const { db } = container;

export const getGuildSettings = async (guildID: string) => {
  const val = await db.collection('guilds').doc(guildID).get();
  return val.data();
};
export const setGuildSettings = async (
  guildID: string,
  data: FirebaseFirestore.DocumentData,
  options: FirebaseFirestore.SetOptions = { merge: true }
): Promise<FirebaseFirestore.WriteResult> => {
  return db.collection('guilds').doc(guildID).set(data, options);
};
