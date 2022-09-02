import { container, type SapphireClient } from '@sapphire/framework';
import { GuildMember, PermissionFlagsBits, User } from 'discord.js';
import { FieldValue } from 'firebase-admin/firestore';

const { db } = container;

export interface UserData {
  dataOptOut?: boolean;
}

export const isAdmin = (
  client: SapphireClient,
  guildID: string,
  userID: string | User | GuildMember
): boolean | undefined => {
  if (typeof userID === 'string') {
    return client.guilds.cache
      .get(guildID)
      ?.members.cache.get(userID)
      ?.permissions.has(PermissionFlagsBits.ManageGuild);
  }
  return client.guilds.cache
    .get(guildID)
    ?.members.cache.get(userID.id)
    ?.permissions.has(PermissionFlagsBits.ManageGuild);
};

export const getUserDataRef = (
  userID: string
): Promise<FirebaseFirestore.DocumentSnapshot<any>> => {
  return db.collection('users').doc(userID).get();
};

export const getUserData = (userID: string): Promise<UserData> =>
  getUserDataRef(userID).then((doc) => doc.data());

export const setUserData = (
  userID: string,
  data: Partial<FirebaseFirestore.DocumentData>,
  options: FirebaseFirestore.SetOptions = { merge: true }
): Promise<FirebaseFirestore.WriteResult> => {
  return db.collection('users').doc(userID).set(data, options);
};

export const deleteFieldFromUserData = (userID: string, fields: string[]) => {
  const keyDelete: { [field: string]: FieldValue } = {};
  fields.forEach((field) => {
    keyDelete[field] = FieldValue.delete();
  });
  return db.collection('users').doc(userID).update(keyDelete);
};
