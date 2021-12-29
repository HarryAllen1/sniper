import { Client, ClientOptions, Collection, Message } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent.js';
import BaseCommand from '../utils/structures/BaseCommand.js';
import { CommandOptions } from '../experimental/command.js';
import {
  addCoinsToTotal,
  deleteFieldFromUserData,
  getUserData,
  setUserData,
  UserData,
} from '../utils/helpers/user.js';
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();
class DiscordClient extends Client {
  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string[] = ['!'];
  private _experimentalCommands = new Collection<
    string,
    [
      CommandOptions,
      (client: DiscordClient, message: Message, args: string[]) => Promise<any>
    ]
  >();

  constructor(options: ClientOptions) {
    super(options);
  }

  db = Db;

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
  }

  get experimentalCommands(): Collection<
    string,
    [
      CommandOptions,
      (client: DiscordClient, message: Message, args: string[]) => any
    ]
  > {
    return this._experimentalCommands;
  }

  get events(): Collection<string, BaseEvent> {
    return this._events;
  }
  get prefix(): string[] {
    return this._prefix;
  }

  set prefix(prefix: string[]) {
    this._prefix = prefix;
  }
}

export class Db {
  static get(userID: string): Promise<UserData> {
    return getUserData(userID);
  }

  static db = db;

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

  static async setCoins(userID: string, amount: number): Promise<number> {
    await setUserData(userID, { coins: amount }, { merge: true });
    return (await Db.get(userID)).coins;
  }
  static async addCoins(userID: string, amount: number): Promise<number> {
    return addCoinsToTotal(userID, amount);
  }
}

export default DiscordClient;
