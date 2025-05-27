<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'
import { DChip } from '#components'

import { withTrailingSlash } from 'ufo'
import { dateToDayMonthYear } from '@/utils/date'

import SharedTile from '~/components/shared/Tile.vue'

defineProps<{
  article: Pick<
    BlogCollectionItem,
    'title' | 'description' | 'tags' | 'path' | 'image' | 'date'
  >
}>()
</script>

<template>
  <SharedTile
    :image="article.image"
    :image-alt="`Cover for the blog post ${article.title}`"
    :path="withTrailingSlash(article.path)"
  >
    <div class="flex flex-col p-2">
      <h2
        class="text-3xl font-bold text-cyan-600 dark:text-cyan-200 mb-2 order-2"
      >
        {{ article.title }}
      </h2>

      <p class="order-3">
        {{ article.description }}
      </p>

      <div class="text-right font-bold order-1">
        <time>{{ dateToDayMonthYear(article.date) }}</time>
      </div>

      <div class="text-right mt-3 -mr-5 order-4">
        <DChip
          v-for="tag in article.tags"
          :key="tag"
          class="blog-tile__link__tag"
        >
          #{{ tag }}
        </DChip>
      </div>
    </div>
  </SharedTile>
</template>

<style>
.blog-tile__link__tag {
  @apply mx-1 text-lg font-bold bg-cyan-200 dark:bg-cyan-600;
}
</style>
