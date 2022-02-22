import type { NavbarConfig } from '@vuepress/theme-default';

export const navbar: NavbarConfig = [
  {
    text: 'Invite',
    children: [
      {
        text: 'With all utilities',
        link: 'https://discord.com/api/oauth2/authorize?client_id=893619442712444970&permissions=126016&scope=bot%20applications.commands',
      },
      {
        text: 'For basic functionality',
        link: 'https://discord.com/oauth2/authorize?client_id=893619442712444970&permissions=533112155862&scope=bot%20applications.commands',
      },
    ],
  },
  {
    text: 'Top.gg',
    link: 'https://top.gg/bot/893619442712444970',
  },
  {
    text: 'Discord Bot List',
    link: 'https://discordbotlist.com/bots/sniper-6531',
  },
];
