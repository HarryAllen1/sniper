import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, ListenerOptions } from '@sapphire/framework';
import { cleanContent, Message } from 'discord.js';
import ms from 'ms';
import { sleep } from '../../lib/index.js';
import { editSnipes } from '../../lib/snipes.js';

@ApplyOptions<ListenerOptions>({
  event: Events.MessageUpdate,
})
export class MessageDelete extends Listener<typeof Events.MessageUpdate> {
  public async run(oldMessage: Message, newMessage: Message) {
    if (oldMessage.partial || !oldMessage.inGuild()) return; // content is null
    if (oldMessage.content !== newMessage.content) {
      if (oldMessage.guildId === '882695828140073052')
        this.container.logger.info(
          `old message (${oldMessage.guild?.name}):\n${cleanContent(
            oldMessage.content,
            oldMessage.channel
          )}\nnew message:\n${cleanContent(
            newMessage.content,
            newMessage.channel
          )}`
        );
      editSnipes[oldMessage.channelId] = {
        author: oldMessage.author,
        content: oldMessage.content,
        createdAt: newMessage.editedTimestamp,
        id: newMessage.id,
        cmdId: '',
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
