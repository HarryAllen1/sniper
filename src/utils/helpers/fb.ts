import admin from 'firebase-admin';
const db = admin.firestore();

export const setGuildData = (guildID: string, data: any) => {
  return db.collection('guilds').doc(guildID).set(data, { merge: true });
};
export const setDefaultGuildSettings = (guildID: string) => {
  return setGuildData(guildID, {
    dad: true,
    nou: true,
    ree: true,
    sec: true,
  });
};
export const getGuildSettings = (guildID: string) => {
  return db
    .collection('guilds')
    .doc(guildID)
    .get()
    .then((val) => val.data());
};
