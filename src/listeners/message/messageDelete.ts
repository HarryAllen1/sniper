import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, ListenerOptions } from '@sapphire/framework';
import { cleanContent, Message, PartialMessage } from 'discord.js';
import ms from 'ms';
import { getGuildSettings, getUserData, sleep } from '../../lib/index.js';
import { snipes } from '../../lib/snipes.js';
import { OmitPartialGroupDMChannel } from 'discord.js';

@ApplyOptions<ListenerOptions>({
  event: Events.MessageDelete,
})
export class MessageDelete extends Listener<typeof Events.MessageDelete> {
  public async run(
    message: OmitPartialGroupDMChannel<Message<boolean> | PartialMessage>
  ) {
    if (!message.author) return;
    if ((await getUserData(message.author.id))?.dataOptOut) return;
    if (message.partial || !message.inGuild()) return; // content is null

    snipes[message.channelId] = {
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

    const guildSettings = await getGuildSettings(message.guildId);

    await sleep(
      ms(
        guildSettings?.snipeDeleteTime
          ? `${
              guildSettings.snipeDeleteTime > 2147483647 / 1000
                ? 2147483647 / 1000
                : guildSettings.snipeDeleteTime
            }m`
          : '1h'
      )
    );

    if (
      snipes[message.channelId] &&
      snipes[message.channelId]?.createdAt === message.createdTimestamp
    ) {
      delete snipes[message.channelId];
    }
  }
}
