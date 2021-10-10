import { Message, MessageEmbed, MessageEmbedOptions } from 'discord.js';

export const reply = async (
  message: Message,
  embed: (MessageEmbed | MessageEmbedOptions)[]
): Promise<Message> => {
  const value = await message.reply({ embeds: embed });
  return value;
};
