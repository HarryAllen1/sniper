import type { DiscordClient } from '../../client/client.js';
import { client } from '../../sniper.js';

export abstract class BaseEvent {
  constructor(private _name: string) {}

  get name(): string {
    return this._name;
  }
  db = client.db;
  abstract run(client: DiscordClient, ...args: any[]): any | Promise<any>;
}
