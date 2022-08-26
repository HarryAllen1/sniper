import { editSnipes, sleep } from '#lib';
import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, ListenerOptions } from '@sapphire/framework';
import { Message, Util } from 'discord.js';
import ms from 'ms';

@ApplyOptions<ListenerOptions>({
  event: Events.MessageUpdate,
})
export class MessageDelete extends Listener<typeof Events.MessageUpdate> {
  public async run(oldMessage: Message, newMessage: Message) {
    if (oldMessage.partial) return; // content is null
    if (oldMessage.content !== newMessage.content) {
      if (oldMessage.guildId === '882695828140073052')
        this.container.logger.info(
          `old message (${oldMessage.guild?.name}):\n${Util.cleanContent(
            oldMessage.content,
            oldMessage.channel
          )}\nnew message:\n${Util.cleanContent(
            newMessage.content,
            newMessage.channel
          )}`
        );
      editSnipes[oldMessage.channelId] = {
        author: oldMessage.author,
        content: oldMessage.content,
        createdAt: newMessage.editedTimestamp,
        id: newMessage.id,
      };
      await sleep(ms('1h'));

      if (
        editSnipes[oldMessage.channelId]?.createdAt ===
        newMessage.editedTimestamp
      ) {
        delete editSnipes[oldMessage.channelId];
      }
    }
  }
}
