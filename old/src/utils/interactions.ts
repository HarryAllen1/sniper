import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v10';

export const unsnipeContextMenu = new ContextMenuCommandBuilder()
  .setName('unsnipe')
  .setType(ApplicationCommandType.Message);
