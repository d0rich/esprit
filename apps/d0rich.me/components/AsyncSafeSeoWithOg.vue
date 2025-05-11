<script setup lang="ts">
import { computed } from 'vue'
import { joinURL } from 'ufo'

const props = defineProps<{
  title?: string
  ogTitle?: string
  description?: string
  image?: string
}>()

const imageHref = computed(() => {
  if (!props.image) return undefined
  return joinURL('https://d0rich.me', props.image)
})
</script>

<template>
  <Head>
    <Title v-if="title">
      {{ title }}
    </Title>
    <Meta
      v-if="title || ogTitle"
      property="og:title"
      :content="ogTitle || title"
    />
    <Meta v-if="title" property="twitter:title" :content="title" />

    <template v-if="description">
      <Meta name="description" :content="description" />
      <Meta property="og:description" :content="description" />
      <Meta property="twitter:description" :content="description" />
    </template>

    <template v-if="image">
      <Meta property="og:image" :content="imageHref" />
      <Meta property="twitter:image" :content="imageHref" />
      <Meta property="tg:cover" :content="imageHref" />
    </template>

    <Link rel="author" href="https://d0rich.me" />
    <Meta property="tg:channel" content="@d0rich" />
  </Head>
</template>
