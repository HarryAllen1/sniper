import { exec } from 'child_process';
import type { CommandInteraction, Message } from 'discord.js';
import type { DiscordClient } from '../../client/client.js';
import { goodServers } from '../../sniper.js';
import { ConfirmationMessage } from '../../utils/helpers/interactions.js';
import Command, {
  ApplicationCommandsRegistry,
} from '../../utils/structures/BaseCommand.js';

export default class UpdateCommand extends Command {
  constructor() {
    super(
      'update',
      'restricted',
      [],
      5000,
      'Updates deps, pulls code and restarts bot'
    );
  }
  registerApplicationCommands(
    client: DiscordClient,
    registry: ApplicationCommandsRegistry
  ) {
    registry.registerChatInputCommand(
      (b) => b.setName(this.name).setDescription(this.description),
      goodServers
    );
  }
  chatInputRun(client: DiscordClient, interaction: CommandInteraction) {
    this.run(client, interaction);
  }

  async run(client: DiscordClient, message: Message | CommandInteraction) {
    new ConfirmationMessage(message, {
      title: 'Are you sure you want to update Sniper?',
      description: 'This will also restart the bot.',
    }).on('confirm', (i) => {
      i.reply('Updating sniper....');
      exec(
        'rm ../../pnpm-lock.yaml && git pull && pnpm i && npm run build && pm2 restart sniper'
      );
    });
  }
}
