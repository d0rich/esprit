<script setup lang="ts">
import { RouterView } from 'vue-router'
import Layout from './layout/Layout.vue'
</script>

<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<style>
/* TODO: Configure colors more percisely */
body {
  @apply text-black dark:text-white
        bg-neutral-300 dark:bg-neutral-600;
}
</style>
