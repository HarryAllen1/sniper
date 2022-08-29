import { Client, ClientOptions, Collection } from 'discord.js';
import type { Command } from '../utils/structures/BaseCommand.js';
import type { BaseEvent } from '../utils/structures/BaseEvent.js';
import { Db } from './Db.js';

export class DiscordClient<
  Ready extends boolean = boolean
> extends Client<Ready> {
  private _commands = new Collection<string, Command>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string[] | readonly string[] = ['!'];

  constructor(options: ClientOptions) {
    super(options);
  }

  db = Db;

  get commands(): Collection<string, Command> {
    return this._commands;
  }

  get events(): Collection<string, BaseEvent> {
    return this._events;
  }
  get prefix(): string[] | readonly string[] {
    return this._prefix;
  }

  set prefix(prefix: string[] | readonly string[]) {
    this._prefix = prefix;
  }
}
