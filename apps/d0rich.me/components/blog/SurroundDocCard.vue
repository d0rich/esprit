<script lang="ts">
import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'
export default {
  name: 'DLayoutSurroundDocCard'
}
</script>

<script setup lang="ts">
defineProps<{
  doc: MarkdownParsedContent
  direction: 'before' | 'after'
}>()
</script>

<template>
  <NuxtLink
    :to="addTrailingSlash(doc._path)"
    class="transition-transform hover:scale-90"
  >
    <DCard dense>
      <DCardTitle v-if="direction === 'before'" class="[&_h3]:!text-cyan-800">
        Older<Icon name="ic:sharp-arrow-forward-ios" />
      </DCardTitle>
      <DCardTitle v-else class="[&_h3]:!text-cyan-800">
        <Icon name="ic:sharp-arrow-back-ios" />Newer
      </DCardTitle>
      <h4 class="text-xl font-bold">
        {{ doc.title }}
      </h4>
      <p>{{ doc.description }}</p>
    </DCard>
  </NuxtLink>
</template>
