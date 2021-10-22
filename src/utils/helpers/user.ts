import { GuildMember, User } from 'discord.js';
import admin from 'firebase-admin';
import DiscordClient from '../../client/client';
import { client } from '../../sniper';

const db = admin.firestore();

export const isAdmin = (
  client: DiscordClient,
  guildID: string,
  userID: string | User | GuildMember
): boolean | undefined => {
  if (typeof userID === 'string') {
    return client.guilds.cache
      .get(guildID)
      ?.members.cache.get(userID)
      ?.permissions.has('MANAGE_GUILD');
  } else {
    return client.guilds.cache
      .get(guildID)
      ?.members.cache.get(userID.id)
      ?.permissions.has('MANAGE_GUILD');
  }
};

export const addCoinsToTotal = async (
  userID: string,
  addedCoins: number
): Promise<number> => {
  let totalCoins: number;
  return db
    .collection('users')
    .doc(userID)
    .get()
    .then((stuff) => {
      const coins: number = stuff.data()?.coins ? stuff.data()?.coins : 0;
      return db
        .collection('users')
        .doc(userID)
        .set(
          {
            coins: coins + addedCoins,
            tag: client.users.cache.get(userID)?.tag,
          },
          { merge: true }
        )
        .then((result) => {
          return coins + addedCoins;
        });
    });
};

export const getTotalCoins = (userID: string): Promise<number> => {
  return db
    .collection('users')
    .doc(userID)
    .get()
    .then((stuff) => {
      return stuff.data()?.coins ? stuff.data()?.coins : 0;
    });
};
export const getUserData = (userID: string): Promise<any> => {
  return db
    .collection('users')
    .doc(userID)
    .get()
    .then((stuff) => {
      return stuff.data();
    });
};

export const getUserDataRef = (
  userID: string
): Promise<FirebaseFirestore.DocumentSnapshot<any>> => {
  return db.collection('users').doc(userID).get();
};

export const setUserData = (
  userID: string,
  data: Partial<FirebaseFirestore.DocumentData>,
  options: FirebaseFirestore.SetOptions
): Promise<FirebaseFirestore.WriteResult> => {
  return db.collection('users').doc(userID).set(data, options);
};

export const deleteFieldFromUserData = (userID: string, fields: string[]) => {
  let keyDelete: { [field: string]: admin.firestore.FieldValue } = {};
  fields.forEach((field) => {
    keyDelete[field] = admin.firestore.FieldValue.delete();
  });
  return db.collection('users').doc(userID).update(keyDelete);
};

/**
 *
 * @param userID
 * @param amount amount of coins to set
 * @returns the amount of coins the user has
 */
export const setTotalCoins = async (
  userID: string,
  amount: number
): Promise<number> => {
  const total = await getTotalCoins(userID);
  return setTotalCoins(userID, total + amount);
};
