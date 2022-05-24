import type { SidebarConfig } from '@vuepress/theme-default';

export const sidebar: SidebarConfig = {
  '/': [
    {
      text: 'Update',
      link: '/update.md',
    },
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
    {
      text: 'Legal',
      children: ['/privacy.md', '/terms.md'],
    },
  ],
};
