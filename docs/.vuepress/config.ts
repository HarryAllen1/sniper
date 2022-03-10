import type { DefaultThemeOptions, ViteBundlerOptions } from 'vuepress';
import { defineUserConfig } from 'vuepress';
import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  lang: 'en-US',

  title: 'Sniper Docs',
  description: 'Sniper is a utility bot with a focus on snipe commands.',
  themeConfig: {
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
    [
      '@vuepress/plugin-shiki',
      {
        theme: 'one-dark-pro',
      },
    ],
    ['@vuepress/plugin-google-analytics', { id: 'G-K31ECX4YK3' }],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
        },
      },
    ],
    ['@vuepress/plugin-toc'],
    ['@vuepress/plugin-pwa'],
    [
      '@vuepress/plugin-pwa-popup',
      {
        locales: {
          '/': {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
      },
    ],
  ],
});
