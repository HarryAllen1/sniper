import { getGuildSettings, setGuildSettings } from '../utils/helpers/fb.js';
import {
  addCoinsToTotal,
  deleteFieldFromUserData,
  getUserData,
  setUserData,
  UserData,
} from '../utils/helpers/user.js';

export class Db {
  static get(userID: string): Promise<UserData> {
    return getUserData(userID);
  }

  static db: FirebaseFirestore.Firestore;

  static async set(
    userID: string,
    data: Partial<FirebaseFirestore.DocumentData>,
    options: FirebaseFirestore.SetOptions = { merge: true }
  ) {
    return setUserData(userID, data, options);
  }

  static async getCoins(userID: string): Promise<number> {
    return (await Db.get(userID)).coins;
  }

  static deleteField(
    userID: string,
    fields: string[]
  ): Promise<FirebaseFirestore.WriteResult> {
    return deleteFieldFromUserData(userID, fields);
  }

  static getGuildSettings(
    guildID: string
  ): Promise<FirebaseFirestore.DocumentData | undefined> {
    return getGuildSettings(guildID);
  }

  static setGuildSettings(
    guildID: string,
    data: FirebaseFirestore.DocumentData,
    options: FirebaseFirestore.SetOptions = { merge: true }
  ): Promise<FirebaseFirestore.WriteResult> {
    return setGuildSettings(guildID, data, options);
  }

  static async setCoins(userID: string, amount: number): Promise<number> {
    await setUserData(userID, { coins: amount }, { merge: true });
    return (await Db.get(userID)).coins;
  }
  static async addCoins(userID: string, amount: number): Promise<number> {
    return addCoinsToTotal(userID, amount);
  }
}
