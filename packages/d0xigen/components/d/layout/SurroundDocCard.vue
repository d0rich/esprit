<script lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
export default {
  name: 'DLayoutSurroundDocCard'
}
</script>

<script setup lang="ts">
defineProps<{
  doc: ParsedContent
  direction: 'before' | 'after'
}>()
</script>

<template>
  <NuxtLink
    :to="doc._path"
    class="d-next-prev-card"
    :class="{
      next: direction === 'after',
      prev: direction === 'before'
    }"
  >
    <DCard dense>
      <DCardTitle v-if="direction === 'before'">
        <Icon name="ic:sharp-arrow-back-ios" />Previous
      </DCardTitle>
      <DCardTitle v-else>
        Next<Icon name="ic:sharp-arrow-forward-ios" />
      </DCardTitle>
      <h4 class="text-xl font-bold">
        {{ doc.title }}
      </h4>
      <p>{{ doc.description }}</p>
    </DCard>
  </NuxtLink>
</template>

<style scoped>
.d-next-prev-card {
  @apply transition-transform hover:scale-90;
}
</style>
