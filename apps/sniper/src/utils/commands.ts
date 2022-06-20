import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';

export interface Commands {
  command: RESTPostAPIApplicationCommandsJSONBody;
  guildIds?: string[];
}

export const commands: Array<Commands> = [];
