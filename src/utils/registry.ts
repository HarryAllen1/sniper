import path from 'path';
import { promises as fs } from 'fs';
import DiscordClient from '../client/client.js';
import BaseEvent from './structures/BaseEvent.js';
import BaseCommand from './structures/BaseCommand.js';
import { Collection } from 'discord.js';

import { default as ms } from 'ms';
import { client } from '../sniper.js';

interface CommandHelper {
  [name: string]: CommandCategory;
}

interface CommandCategory {
  commands: Array<Commands>;
}

interface Commands {
  name: string;
  value: string;
}
export const helpCommandHelper: CommandHelper = {};
export const helpCommandHelperCollection = new Collection<
  string,
  CommandCategory
>();
export const allCommands = client.commands;

export async function registerCommands(client: DiscordClient, dir = '') {
  const filePath = path.join(process.cwd(), dir);
  const files = await fs.readdir(filePath);

  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));

    if (stat.isDirectory()) {
      registerCommands(client, path.join(dir, file));
      helpCommandHelper[file] = { commands: [] };
      helpCommandHelperCollection.set(file, { commands: [] });
    }
    if (file.endsWith('Command.js') || file.endsWith('Command.ts')) {
      const Command = (await import('../../../' + path.join(dir, file)))
        .default;
      const command = new Command() as BaseCommand;

      // if (!command.permissionsRequired) {
      //   command.permissionsRequired = [];
      // }
      if (helpCommandHelperCollection.has(command.category)) {
        helpCommandHelperCollection.get(command.category)?.commands.push({
          name: command.name,
          value: `${command.description}\n${
            command.argsDescription ? `Args: ${command.argsDescription}\n` : ''
          }Cooldown: ${ms(command.cooldown)}`,
        });
      }
      if (helpCommandHelper[command.category])
        helpCommandHelper[command.category].commands.push({
          name: command.name,
          value: `${command.description}\n${
            command.argsDescription ? `Args: ${command.argsDescription}\n` : ''
          }Cooldown: ${ms(command.cooldown)}`,
        });

      client.commands.set(command.name, command);
      command.aliases.forEach((alias: string) => {
        client.commands.set(alias, command);
      });
    }
  }
}

export async function registerEvents(client: DiscordClient, dir = '') {
  const filePath = path.join(process.cwd(), dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('Event.js') || file.endsWith('Event.ts')) {
      const { default: Event } = await import(
        '../../../' + path.join(dir, file)
      );
      const event = new Event() as BaseEvent;
      client.events.set(event.name, event);
      client.on(event.name, event.run.bind(event, client));
    }
  }
}
