import type { SapphireClient } from '@sapphire/framework';
import type {
  Message,
  MessageOptions,
  MessagePayload,
  TextChannel,
} from 'discord.js';

export const sendMessageInBorderSecurity = (
  client: SapphireClient,
  options: string | MessagePayload | MessageOptions
): Promise<Message> => {
  const borderSecurity = client.channels.cache.get(
    '882695828140073054'
  ) as TextChannel;

  return borderSecurity.send(options);
};
