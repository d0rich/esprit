<script lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'
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
  <NuxtLink :to="doc._path" class="transition-transform hover:scale-90">
    <DCard dense>
      <DCardTitle v-if="direction === 'before'">
        <Icon name="ic:sharp-arrow-back-ios" />Previous
      </DCardTitle>
      <DCardTitle v-else>
        Next<Icon name="ic:sharp-arrow-forward-ios" />
      </DCardTitle>
      <h4 class="text-xl font-bold">{{ doc.title }}</h4>
      <p>{{ doc.description }}</p>
    </DCard>
  </NuxtLink>
</template>
