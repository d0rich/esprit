<script lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'
import { withTrailingSlash } from 'ufo'
import { DCard, DCardTitle, Icon, NuxtLink } from '#components'

export default {
  name: 'DLayoutSurroundDocCard'
}
</script>

<script setup lang="ts">
defineProps<{
  doc: BlogCollectionItem
  direction: 'before' | 'after'
}>()
</script>

<template>
  <NuxtLink
    :to="withTrailingSlash(doc.path)"
    class="transition-transform hover:scale-90 motion-reduce:transition-none"
  >
    <DCard dense>
      <DCardTitle
        v-if="direction === 'before'"
        class="dark:[&_h3]:!text-cyan-800 [&_h3]:!text-cyan-200"
      >
        Older<Icon name="ic:sharp-arrow-forward-ios" />
      </DCardTitle>
      <DCardTitle
        v-else
        class="dark:[&_h3]:!text-cyan-800 [&_h3]:!text-cyan-200"
      >
        <Icon name="ic:sharp-arrow-back-ios" />Newer
      </DCardTitle>
      <h4 class="text-xl font-bold">
        {{ doc.title }}
      </h4>
      <p>{{ doc.description }}</p>
    </DCard>
  </NuxtLink>
</template>
