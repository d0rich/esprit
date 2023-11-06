<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface BlogContent extends ParsedContent {
  image?: string
  date?: Date
  tags?: string[]
}

defineProps<{
  article: BlogContent
}>()
</script>

<template>
  <DWrapShape class="blog-tile" shape-class="blog-tile__shape">
    <template #shape-content>
      <div v-if="article.image" class="relative w-full h-full overflow-hidden">
        <img
          class="blog-tile__image"
          :src="article.image"
          :alt="`Cover for the blog post ${article.title}`"
        />
      </div>
    </template>
    <NuxtLink
      :to="addTrailingSlash(article._path)"
      class="block"
      style="padding: var(--shape-card--dense__padding)"
    >
      <div class="p-2">
        <div class="text-right font-bold">
          <time>{{ dateToDayMonthYear(article.date) }}</time>
        </div>
        <h2 class="text-3xl font-bold text-cyan-200 mb-2">
          {{ article.title }}
        </h2>

        <p>
          {{ article.description }}
        </p>

        <div class="text-right mt-3 -mr-5">
          <DChip
            v-for="tag in article.tags"
            :key="tag"
            class="blog-tile__link__tag"
          >
            #{{ tag }}
          </DChip>
        </div>
      </div>
    </NuxtLink>
  </DWrapShape>
</template>

<style>
.blog-tile {
  @apply scale-90 hover:scale-100 transition-transform;
}

.blog-tile__shape {
  clip-path: var(--shape-card--dense);
  @apply bg-black bg-opacity-70;
}

.blog-tile__image {
  @apply absolute object-cover h-full
         translate-x-2/3 translate-y-2/3 -rotate-45
         transition-all;
}

.blog-tile:hover .blog-tile__image {
  @apply translate-x-1/2 translate-y-1/2 opacity-10;
}

.blog-tile__link__tag {
  @apply mx-1 text-lg font-bold bg-cyan-600;
}
</style>
