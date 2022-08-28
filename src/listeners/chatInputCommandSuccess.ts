import { ApplyOptions } from '@sapphire/decorators';
import type {
  ChatInputCommandSuccessPayload,
  ListenerOptions,
} from '@sapphire/framework';
import { Command, Events, Listener, LogLevel } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { cyan } from 'colorette';
import type { Guild, User } from 'discord.js';

@ApplyOptions<ListenerOptions>({
  event: Events.ChatInputCommandSuccess,
})
export class UserEvent extends Listener<typeof Events.ChatInputCommandSuccess> {
  public run({ interaction, command }: ChatInputCommandSuccessPayload) {
    const shard = this.shard(interaction.guild?.shardId ?? 0);
    const commandName = this.command(command);
    const author = this.author(interaction.user);
    const sentAt = interaction.guild
      ? this.guild(interaction.guild)
      : this.direct();
    this.container.logger.debug(
      `${shard} - ${commandName} ${author} ${sentAt}`
    );
  }

  public onLoad() {
    this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
    return super.onLoad();
  }

  private shard(id: number) {
    return `[${cyan(id.toString())}]`;
  }

  private command(command: Command) {
    return cyan(command.name);
  }

  private author(author: User) {
    return `${author.username}[${cyan(author.id)}]`;
  }

  private direct() {
    return cyan('Direct interactions');
  }

  private guild(guild: Guild) {
    return `${guild.name}[${cyan(guild.id)}]`;
  }
}
