import type { SidebarConfig } from '@vuepress/theme-default';

export const sidebar: SidebarConfig = {
  '/': [
    {
      text: 'Introduction',
      children: ['/'],
    },
    {
      text: 'Commands',
      children: ['/commands/README.md'],
    },
  ],
};
