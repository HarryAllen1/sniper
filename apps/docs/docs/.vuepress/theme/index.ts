import { path } from '@vuepress/utils';

export default {
  name: 'vuepress-theme-sniper-docs',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
};
