<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
</script>

<template>
  <ParentLayout></ParentLayout>
</template>

<style lang="scss">
:root {
  --c-brand: #02b3f6;
}
html.dark {
  --c-brand: #02b3f6;
  .navbar {
    --c-text: #2c3e50;
  }
}
.navbar *:not(.navbar-dropdown) {
  --c-text-quote: var(--c-text);
}
.navbar {
  background-color: var(--c-brand);
  --c-text: #2c3e50;

  div > * {
    padding: 0;
    background: #0000;
  }
  .arrow.down {
    --c-bg-arrow: var(--c-text);
  }
  .navbar-items .external-link-icon:not(.navbar-dropdown .external-link-icon) {
    --c-bg-arrow: var(--c-text);
  }
  .navbar-items a:not(.navbar-dropdown a) {
    color: var(--c-text);
  }
  .navbar-item {
    background: #0000;
    backdrop-filter: none;
  }
}
</style>
