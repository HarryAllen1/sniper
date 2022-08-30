import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Colors, EmbedBuilder } from 'discord.js';
import { exec } from 'node:child_process';
import { config } from '../../config.js';
import { ConfirmationMessage } from '../../lib/index.js';

@ApplyOptions<Command.Options>({
  description:
    'Pulls changes, updates all dependencies on VM and restarts the VM',
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
    new ConfirmationMessage(
      interaction,
      new EmbedBuilder()
        .setTitle('Are you sure you want to update Sniper?')
        .setDescription('This will also restart the VM')
        .setColor(Colors.Green)
    ).on('confirm', async (i) => {
      await i.reply('updating sniper....');
      exec(
        'rm ./pnpm-lock.yaml && git pull && pnpm i && npm run build && sudo apt update && sudo apt upgrade -y && sudo reboot'
      );
    });
  }
}
