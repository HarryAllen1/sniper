import { path } from '@vuepress/utils';
import type { DefaultThemeOptions, ViteBundlerOptions } from 'vuepress';
import { defineUserConfig } from 'vuepress';
import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // site config
  lang: 'en-US',
  title: 'Sniper Docs',
  description: 'Sniper is a utility bot with a focus on snipe commands.',
  theme: path.resolve(__dirname, 'theme', 'index.ts'),
  themeConfig: {
    logo: 'https://cdn.discordapp.com/avatars/893619442712444970/d5f43ef2880350c1fa5ddd288d927327.webp',
    locales: {
      '/': {
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
  ],

  plugins: [
    [
      '@vuepress/plugin-shiki',
      {
        theme: 'one-dark-pro',
      },
    ],
  ],
});
