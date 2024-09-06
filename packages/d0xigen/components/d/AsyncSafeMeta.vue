<script setup lang="ts">
const config = useAppConfig()
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
    <template v-if="description">
      <Meta v-if="description" name="description" :content="description" />
      <Meta
        v-if="description"
        property="og:description"
        :content="description"
      />
    </template>

    <Link
      v-if="config.d0xigen.authorSocial?.website"
      rel="author"
      :href="config.d0xigen.authorSocial?.website"
    />
    <Meta
      v-if="config.d0xigen.authorSocial?.telegram"
      property="tg:channel"
      :content="config.d0xigen.authorSocial?.telegram"
    />
  </Head>
</template>
