<script setup lang="ts">
import { computed } from 'vue'
import {
  useRoute,
  onNuxtReady,
  useHead,
  useSeoMeta,
  useTransitionAnimationWorkaround
} from '#imports'
import { NuxtLayout, NuxtPage, DBigBangButtonAnimation } from '#components'
import { useFaviconAnimation } from '~/composables/favicon'

const { key } = useTransitionAnimationWorkaround()
const route = useRoute()

const description = 'Small web portal of an experienced IT specialist.'

onNuxtReady(() => {
  useFaviconAnimation()
})

useHead({
  titleTemplate(title: string | undefined) {
    if (title) return `${title} • d0rich`
    else return 'd0rich: dream developer'
  },
  meta: [
    {
      name: 'keywords',
      content: [
        'Nikolai Dorofeev',
        'd0rich',
        'dorich2000@gmail.com',
        'n.dorofeev.pro@gmail.com',
        'developer',
        'programmer',
        'software engineer',
        'IT',
        'informational technologies',
        'web',
        'frontend',
        'backend',
        'fullstack',
        'blockchain'
      ].join(', ')
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  description,
  ogDescription: description,
  author: 'Nikolai Dorofeev',
  generator: 'Nuxt 3',
  ogSiteName: 'd0rich.me',
  ogImage: 'https://d0rich.me/og/image.jpg',
  ogUrl: computed(() => 'https://d0rich.me' + route.path),
  twitterCard: 'summary_large_image',
  twitterSite: '@d0rich',
  twitterCreator: '@d0rich',
  twitterImage: 'https://d0rich.me/og/image.jpg',
  twitterTitle: 'd0rich: dream developer',
  twitterDescription: description
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="key" />
  </NuxtLayout>
  <DBigBangButtonAnimation class="z-50" />
</template>
