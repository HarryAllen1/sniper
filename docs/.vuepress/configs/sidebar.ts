import type { SidebarConfig } from '@vuepress/theme-default';

export const sidebar: SidebarConfig = {
  '/': [
    {
      text: 'Update',
      link: '/update.md',
    },
    {
      text: 'Home',
      link: '../../README.md',
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
      link: '/commands/README.md',
    },
    {
      text: 'Legal',
      children: ['/privacy.md', '/terms.md'],
    },
  ],
};
