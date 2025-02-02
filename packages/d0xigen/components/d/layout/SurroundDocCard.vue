<script lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'
export default {
  name: 'DLayoutSurroundDocCard'
}
</script>

<script setup lang="ts">
defineProps<{
  doc: ContentCollectionItem
  direction: 'before' | 'after'
}>()
</script>

<template>
  <NuxtLink
    :to="doc.path"
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
