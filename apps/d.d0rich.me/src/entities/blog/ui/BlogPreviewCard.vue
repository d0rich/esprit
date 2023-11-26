<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { DWrapShape } from '@d0rich/esprit-design'
import type { Blog } from '../model/Blog'
import BlogAvatar from './BlogAvatar.vue'

defineProps<{
  blog: Blog
  address: string
}>()
</script>

<template>
  <DWrapShape class="blog-preview-card" shape-class="blog-preview-card__shape">
    <template #shape-content>
      <div class="relative w-full h-full overflow-hidden">
        <BlogAvatar
          :address="address"
          class="blog-preview-card__image"
          :aria-label="`Cover for the blog ${blog.name} on D`"
        />
      </div>
    </template>
    <RouterLink
      :to="`/blog/${address}`"
      class="block"
      style="padding: var(--shape-card--dense__padding)"
    >
      <div class="p-2 prose dark:prose-invert">
        <h2>{{ blog.name }}</h2>

        <p>{{ blog.description }}</p>
      </div>
    </RouterLink>
  </DWrapShape>
</template>

<style>
.blog-preview-card {
  @apply scale-90 hover:scale-100 transition-transform;
}

.blog-preview-card__shape {
  clip-path: var(--shape-card--dense);
  @apply bg-black bg-opacity-70;
}

.blog-preview-card__image {
  @apply absolute object-cover h-full
         translate-x-2/3 translate-y-2/3 -rotate-45
         transition-all;
}

.blog-preview-card:hover .blog-preview-card__image {
  @apply translate-x-1/2 translate-y-1/2 opacity-10;
}

.blog-preview-card__link__tag {
  @apply mx-1 text-lg font-bold bg-cyan-600;
}
</style>
