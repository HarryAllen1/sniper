import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Colors, EmbedBuilder } from 'discord.js';
import { exec } from 'node:child_process';
import { config } from '../../config.js';
import { ConfirmationMessage } from '../../lib/index.js';

@ApplyOptions<Command.Options>({
  description: 'Restarts sniper',
  preconditions: ['OwnerOnly'],
})
export class UserCommand extends Command {
  public registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (b) => b.setName(this.name).setDescription(this.description),
      {
        guildIds: config.ownerGuilds,
        idHints: ['1014207656069697607'],
      }
    );
  }

  public chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    new ConfirmationMessage(
      interaction,
      new EmbedBuilder()
        .setTitle('Are you sure you want to restart Sniper?')
        .setColor(Colors.Green)
    ).on('confirm', (i) => {
      void i.reply('restarting sniper....');
      exec('pm2 restart sniper');
    });
  }
}
