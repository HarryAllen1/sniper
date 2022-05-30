import { defaultTheme, DefaultThemeOptions, ThemeObject } from 'vuepress';

export const sniperTheme: (config: DefaultThemeOptions) => ThemeObject = (
  options
) => ({
  name: 'vuepress-theme-sniper-docs',
  extends: defaultTheme(options),
  layouts: {
    Layout: '',
  },
});
