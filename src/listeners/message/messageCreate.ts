import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, ListenerOptions } from '@sapphire/framework';
import { Message } from 'discord.js';

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate,
})
export class MessageDelete extends Listener<typeof Events.MessageCreate> {
  public async run(message: Message) {
    const prefixes =
      (await this.getGuildSettings(message.guildId ?? ''))?.prefixes &&
      (await this.getGuildSettings(message.guildId ?? ''))?.prefixes[0]
        ? (await this.getGuildSettings(message.guildId ?? ''))?.prefixes
        : ['$'];

    for (const prefix of prefixes) {
      if (message.content.toLowerCase().startsWith(prefix)) {
        this.container.stores.get('commands').forEach((cmd) => {
          if (
            cmd.name === message.content.split(' ')[0].slice(1) ||
            cmd.aliases.includes(message.content.split(' ')[0].slice(1))
          ) {
            return message.reply(
              `Sniper has permanently switched to slash commands. Please use </${
                cmd.name
              }:${
                this.container.client.application?.commands.cache.find(
                  (v) => v.name === cmd.name
                )?.id
              }>.`
            );
          }
        });
      }
    }
  }

  private async getGuildSettings(guildID: string) {
    const val = await this.container.db.collection('guilds').doc(guildID).get();
    return val.data();
  }
}
