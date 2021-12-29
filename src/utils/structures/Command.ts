import { Message, PermissionString } from 'discord.js';
import ms from 'ms';
import DiscordClient from '../../client/client.js';
import { StringValue } from '../helpers/misc.js';

export interface CommandOptions {
  name: string;
  category: string;
  arguments?: {
    value: string[];
    required?: boolean;
  };
  aliases?: string[];
  description?: string;
  permissions?: PermissionString[];
  cooldown?:
    | {
        value?: number | StringValue;
        message?: string;
      }
    | number
    | StringValue;
  disabled?: boolean;
}

export const createCommand = (
  options: CommandOptions,
  command: (
    client: DiscordClient,
    message: Message,
    args: string[]
  ) => Promise<any>
) => {
  if (typeof options.cooldown === 'number') {
    options.cooldown = { value: options.cooldown };
  } else if (typeof options.cooldown === 'string') {
    options.cooldown = { value: options.cooldown };
  }
  if (typeof options.cooldown?.value === 'string') {
    options.cooldown.value = ms(options.cooldown.value);
  }
  return [options, command];
};
