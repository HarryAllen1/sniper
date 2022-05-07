import { defaultTheme } from 'vuepress';
import { defineUserConfig } from 'vuepress';
import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { searchPlugin } from '@vuepress/plugin-search';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { tocPlugin } from '@vuepress/plugin-toc';

export default defineUserConfig({
  lang: 'en-US',

  title: 'Sniper Docs',
  description: 'Sniper is a utility bot with a focus on snipe commands.',
  theme: defaultTheme({
    repo: 'MajesticString/sniper',
    docsDir: 'apps/docs/docs',
    logo: 'https://cdn.discordapp.com/avatars/893619442712444970/d5f43ef2880350c1fa5ddd288d927327.webp',
    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        navbar,
        sidebar,
      },
    },
  }),

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://cdn.discordapp.com/avatars/893619442712444970/d5f43ef2880350c1fa5ddd288d927327.png',
      },
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/manifest.webmanifest',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#02b3f6',
      },
    ],
  ],

  plugins: [
    shikiPlugin({
      theme: 'one-dark-pro',
    }),
    googleAnalyticsPlugin({ id: 'G-K31ECX4YK3' }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
    }),
    tocPlugin(),
  ],
});
