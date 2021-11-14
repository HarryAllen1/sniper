import path from 'path';
import { promises as fs } from 'fs';
import DiscordClient from '../client/client';
import BaseEvent from './structures/BaseEvent';
import BaseCommand from './structures/BaseCommand';
import { token, clientID } from '../../slappey.json';
import { REST } from '@discordjs/rest';
import {
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from 'discord-api-types/v9';
import ms from 'ms';

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
export const slashCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];
export const helpCommandHelper: CommandHelper = {};

export async function registerCommands(
  client: DiscordClient,
  dir: string = ''
) {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);

  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));

    if (stat.isDirectory()) {
      registerCommands(client, path.join(dir, file));
      helpCommandHelper[file] = { commands: [] };
    }
    if (file.endsWith('Command.js') || file.endsWith('Command.ts')) {
      const { default: Command } = await import(path.join(dir, file));
      const command = new Command() as BaseCommand;
      if (command.slashCommand) {
        slashCommands.push(command.slashCommand);
      }
      // if (!command.permissionsRequired) {
      //   command.permissionsRequired = [];
      // }
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

export async function registerEvents(client: DiscordClient, dir: string = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('Event.js') || file.endsWith('Event.ts')) {
      const { default: Event } = await import(path.join(dir, file));
      const event = new Event() as BaseEvent;
      client.events.set(event.name, event);
      client.on(event.name, event.run.bind(event, client));
    }
  }
}
