import { Client, ClientOptions, Collection, Message } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent.js';
import BaseCommand from '../utils/structures/BaseCommand.js';
import { CommandOptions } from '../utils/structures/Command.js';

import { Db } from './Db.js';
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
      (client: DiscordClient, message: Message, args: string[]) => Promise<any>
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

export default DiscordClient;
