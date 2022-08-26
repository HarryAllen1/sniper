import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, ListenerOptions } from '@sapphire/framework';
import { cleanContent, Message } from 'discord.js';
import ms from 'ms';
import { sleep } from '../../lib/index.js';
import { snipes } from '../../lib/snipes.js';

@ApplyOptions<ListenerOptions>({
  event: Events.MessageDelete,
})
export class MessageDelete extends Listener<typeof Events.MessageDelete> {
  public async run(message: Message) {
    if (message.partial) return; // content is null
    if (
      message.content.toLowerCase() !== '.pick' &&
      message.guildId === '882695828140073052'
    )
      this.container.logger.info(
        `${message.guild?.name}: ${
          message.member?.user.username
        }: ${cleanContent(message.content, message.channel)}`
      );

    snipes[message.channel.id] = {
      author: message.author,
      content: message.content,
      createdAt: message.createdTimestamp,
      attachment: message.attachments.first()?.url,
      attachments: [...message.attachments.values()]?.map((a) => a.proxyURL),
      embeds: Array.isArray(message.embeds) ? undefined : message.embeds,
      message,
      cmdId: message.id,
    };
    // const snipeContent: any = {};
    // snipeContent[message.channel.id] = {
    //   author: message.author.id,
    //   content: message.content,
    //   createdAt: message.createdTimestamp,

    //   // attachment: message.attachments.first()?.url,
    // };
    // setSnipe(snipeContent);

    await sleep(ms('1h'));

    if (
      snipes[message.channelId] &&
      snipes[message.channelId]?.createdAt === message.createdTimestamp
    ) {
      delete snipes[message.channel.id];
    }
  }
}
