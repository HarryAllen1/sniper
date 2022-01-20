import {
  Message,
  MessagePayload,
  MessageOptions,
  TextChannel,
} from 'discord.js';
import DiscordClient from '../../client/client.js';

export const sendMessageInBorderSecurity = (
  client: DiscordClient,
  options: string | MessagePayload | MessageOptions
): Promise<Message> => {
  const borderSecurity = client.channels.cache.get(
    '882695828140073054'
  ) as TextChannel;

  return borderSecurity.send(options);
};
