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
.navbar {
  background-color: var(--c-brand);
  --c-text: #2c3e50;
  --c-text-quote: var(--c-text);
  --c-bg-arrow: var(--c-text);
  div > * {
    padding: 0;
    background: #0000;
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
