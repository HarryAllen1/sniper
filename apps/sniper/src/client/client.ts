import { Client, ClientOptions, Collection } from 'discord.js';
import type { BaseCommand } from '../utils/structures/BaseCommand.js';
import type { BaseEvent } from '../utils/structures/BaseEvent.js';
import { Db } from './Db.js';

export class DiscordClient<
  Ready extends boolean = boolean
> extends Client<Ready> {
  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string[] = ['!'];

  constructor(options: ClientOptions) {
    super(options);
  }

  db = Db;

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
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
