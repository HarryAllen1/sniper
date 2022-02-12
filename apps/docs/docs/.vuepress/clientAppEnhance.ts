import {
  DiscordButton,
  DiscordButtons,
  DiscordEmbed,
  DiscordEmbedField,
  DiscordEmbedFields,
  DiscordInteraction,
  DiscordMarkdown,
  DiscordMention,
  DiscordMessage,
  DiscordMessages,
  DiscordReaction,
  DiscordReactions,
  install as DiscordMessageComponents,
} from '@discord-message-components/vue';
import { defineClientAppEnhance } from '@vuepress/client';

export default defineClientAppEnhance(({ app }) => {
  app.use(DiscordMessageComponents, {
    avatars: {
      sniper:
        'https://cdn.discordapp.com/avatars/893619442712444970/d5f43ef2880350c1fa5ddd288d927327.webp',
    },
    profiles: {
      user: {
        author: 'User',
        avatar: 'blue',
      },
      bot: {
        author: 'Sniper',
        avatar: 'sniper',
        bot: true,
      },
    },
  });
  app
    .component('DiscordButton', DiscordButton)
    .component('DiscordButtons', DiscordButtons)
    .component('DiscordEmbed', DiscordEmbed)
    .component('DiscordEmbedField', DiscordEmbedField)
    .component('DiscordEmbedFields', DiscordEmbedFields)
    .component('DiscordInteraction', DiscordInteraction)
    .component('DiscordMarkdown', DiscordMarkdown)
    .component('DiscordMention', DiscordMention)
    .component('DiscordMessage', DiscordMessage)
    .component('DiscordMessages', DiscordMessages)
    .component('DiscordReaction', DiscordReaction)
    .component('DiscordReactions', DiscordReactions);
});
