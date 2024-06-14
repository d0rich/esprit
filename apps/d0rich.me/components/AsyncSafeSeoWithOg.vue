<script setup lang="ts">
defineProps<{
  title?: string
  ogTitle?: string
  description?: string
  image?: string
}>()
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
    <Meta v-if="description" name="description" :content="description" />
    <Meta v-if="description" property="og:description" :content="description" />
    <Meta
      v-if="description"
      property="twitter:description"
      :content="description"
    />
  </Head>
</template>
