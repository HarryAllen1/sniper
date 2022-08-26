import type { Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { reply } from '../../utils/helpers/message.js';
import Command from '../../utils/structures/BaseCommand.js';

export default class RolesCommand extends Command {
  constructor() {
    super(
      'roles',
      'util',
      [],
      2500,
      'shows the roles of this server and their positions'
    );
  }
  async run(client: DiscordClient, message: Message): Promise<void> {
    reply(message, {
      title: 'Roles',
      description: message.guild?.roles.cache
        .sort((f, s) => s.position - f.position)
        .map((role) => `${role.toString()} - ${role.position}`)
        .join('\n'),
    });
  }
}
