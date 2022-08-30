import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { exec } from 'node:child_process';
import { config } from '../../config.js';
import { ConfirmationMessage } from '../../lib/index.js';

@ApplyOptions<Command.Options>({
  description: 'Updates deps, pulls code and restarts bot',
  preconditions: ['OwnerOnly'],
})
export class UserCommand extends Command {
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (b) => b.setName(this.name).setDescription(this.description),
      {
        guildIds: config.ownerGuilds,
      }
    );
  }

  public chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    new ConfirmationMessage(interaction, {
      title: 'Are you sure you want to update Sniper?',
      description: 'This will also restart the bot.',
    }).on('confirm', (i) => {
      void i.reply('Updating sniper....');
      exec(
        'rm ../../pnpm-lock.yaml && git pull && pnpm i && npm run build && pm2 restart sniper'
      );
    });
  }
}
