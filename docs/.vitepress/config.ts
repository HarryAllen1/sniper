import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'Sniper Docs',
  description: 'Sniper is a utility bot with a focus on snipe commands.',
  vue: {
    reactivityTransform: true,
  },
  base: process.env.GH_PAGES ? '/sniper/' : '/',
  markdown: {
    theme: {
      dark: 'one-dark-pro',
      light: 'github-dark-dimmed',
    },
    lineNumbers: true,
  },
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
    },
    algolia: {
      appId: '9S4NWRYUU9',
      apiKey: '868289ec0b27caa98ebff49324609ce4',
      indexName: 'website',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/MajesticString/sniper',
      },
    ],
    editLink: {
      pattern:
        'https://github.com/MajesticString/sniper/edit/main/summary/:path',
      text: 'Edit this page on GitHub',
    },

    logo: 'https://cdn.discordapp.com/avatars/893619442712444970/d5f43ef2880350c1fa5ddd288d927327.webp',
    nav: [
      {
        text: 'Commands',
        link: '/commands/index.md',
      },
      {
        text: 'Invite',
        items: [
          {
            text: 'With all utilities',
            link: 'https://discord.com/api/oauth2/authorize?client_id=893619442712444970&permissions=126016&scope=bot%20applications.commands',
          },
          {
            text: 'For basic functionality',
            link: 'https://discord.com/api/oauth2/authorize?client_id=893619442712444970&permissions=533112155862&scope=bot%20applications.commands',
          },
        ],
      },
      {
        text: 'Support Server',
        link: 'https://discord.gg/uShPGFDJCJ',
      },
      {
        text: 'Top.gg',
        link: 'https://top.gg/bot/893619442712444970',
      },
      {
        text: 'Discord Bot List',
        link: 'https://discordbotlist.com/bots/sniper-6531',
      },
    ],
    sidebar: [
      {
        text: 'Update',
        collapsible: true,
        items: [{ text: 'How to Update', link: '/update.md' }],
      },
      {
        text: 'Getting Started',
        collapsible: true,
        items: [
          { text: 'Invite', link: '/invite.md' },
          { text: 'Setup', link: '/setup.md' },
        ],
      },
      {
        text: 'Developers',
        collapsible: true,
        items: [{ text: 'Self Hosting', link: '/developers/self-hosting.md' }],
      },
      {
        text: 'Commands',
        collapsible: true,
        items: [
          {
            text: 'Reference',
            link: '/commands/index.md',
          },
        ],
      },
      {
        text: 'Legal',
        items: [
          { text: 'Privacy Policy', link: '/privacy.md' },
          { text: 'Terms of Service', link: '/terms.md' },
        ],
      },
    ],
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://cdn.discordapp.com/avatars/893619442712444970/d5f43ef2880350c1fa5ddd288d927327.png',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#02b3f6',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/@discord-message-components/core/dist/styles/discord-messages.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/@discord-message-components/core/dist/styles/discord-message.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/@discord-message-components/core/dist/styles/discord-author-info.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
      },
    ],
  ],
  lastUpdated: true,
});
