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
  generator: `d0xigen v${useRuntimeConfig().public.version}`,
  ogSiteName: appConfig.d0xigen.title,
  ogImage: appConfig.d0xigen.url + appConfig.d0xigen.og.image,
  twitterImage: appConfig.d0xigen.url + appConfig.d0xigen.og.image,
  twitterCard: 'summary_large_image',
  twitterSite: computed(
    () =>
      appConfig.d0xigen.authorSocial?.twitterSite ??
      appConfig.d0xigen.authorSocial?.twitter
  ),
  twitterCreator: appConfig.d0xigen.authorSocial?.twitter,
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
  @apply bg-neutral-100 dark:bg-neutral-900 dark:text-gray-100;
}
</style>
