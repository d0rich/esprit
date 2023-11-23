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
body {
  @apply text-black dark:text-white;
}
</style>
