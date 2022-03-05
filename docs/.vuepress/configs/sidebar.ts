import type { SidebarConfig } from '@vuepress/theme-default';

export const sidebar: SidebarConfig = {
  '/': [
    {
      text: 'Home',

      children: ['/'],
    },
    {
      text: 'Getting Started',
      children: ['/invite', '/setup'],
    },
    {
      text: 'Developers',
      children: ['/self-hosting'],
    },
    {
      text: 'Commands',

      children: ['/commands/README.md'],
    },
  ],
};
