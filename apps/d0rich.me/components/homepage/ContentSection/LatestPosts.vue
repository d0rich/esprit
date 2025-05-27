<script setup lang="ts">
import { useAsyncData, queryCollection } from '#imports'
import { DBigBangButton } from '#components'
import BlogTile from '~/components/blog/Tile.vue'

const { data: blogPosts } = await useAsyncData(
  'blog/latest',
  () =>
    queryCollection('blog')
      .select('title', 'description', 'date', 'path', 'image', 'tags')
      .where('draft', '=', 0)
      .limit(3)
      .order('date', 'DESC')
      .all(),
  {
    server: true
  }
)
</script>

<template>
  <section class="max-w-7xl mx-auto px-2 md:px-6">
    <div class="flex justify-between items-end gap-x-8">
      <h2 class="text-5xl font-serif">
        Latest Post<span class="hidden md:inline">s</span>
      </h2>
      <DBigBangButton class="text-4xl font-bold" text="blog>" to="/blog/" />
    </div>
    <nav class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogTile
        v-for="(article, i) in blogPosts"
        :class="{
          'hidden md:block': i === 1,
          'hidden lg:block': i === 2
        }"
        :key="article.path"
        :article="article"
      />
    </nav>
  </section>
</template>
