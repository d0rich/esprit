<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
useHead({
  titleTemplate: `%s • ${appConfig.d0xigen.title}`,
  meta: [
    {
      name: 'keywords',
      content: appConfig.d0xigen?.seo?.keywords?.join(', ')
    }
  ]
})
useSeoMeta({
  description: appConfig.d0xigen.description,
  ogDescription: appConfig.d0xigen.description,
  author: appConfig.d0xigen.author,
  generator: 'Nuxt 3',
  ogSiteName: appConfig.d0xigen.title,
  ogImage: appConfig.d0xigen.url + appConfig.d0xigen.og.image,
  ogUrl: computed(() => appConfig.d0xigen.url + route.path)
})
</script>

<template>
  <NuxtPage />
</template>

<style>
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-neutral-200 dark:bg-neutral-900 dark:text-gray-100;
}

:root {
  @apply nuxt-typography-connector;
}
</style>
