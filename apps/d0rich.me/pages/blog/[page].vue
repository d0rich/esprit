<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content'
import type { BlogContent } from '@/components/blog/Tile.vue'

definePageMeta({
  path: '/blog/:page(\\d+)?'
})

const route = useRoute()

const currentPage = computed(() => Number(route.params.page || 1))

const { itemsOnPage, filter } = useBlogNavigationConfig()

const { data: pagesCount } = useAsyncData(
  `blog/pages-count/${itemsOnPage}`,
  () => queryContent<BlogContent>('/blog/').only('_path').where(filter).find(),
  {
    server: true,
    transform: (articles) => Math.ceil(articles.length / itemsOnPage)
  }
)

const blogQuery: QueryBuilderParams = {
  path: '/blog',
  without: ['excerpt', 'body'],
  where: filter,
  limit: itemsOnPage,
  skip: (currentPage.value - 1) * itemsOnPage,
  sort: [{ date: -1 }]
}
</script>

<template>
  <div class="mb-96">
    <AsyncSafeSeoWithOg title="Blog" />
    <div class="relative isolate px-3 max-w-3xl mx-auto my-10 overflow-hidden">
      <div class="max-w-lg">
        <h1
          class="text-6xl sm:text-8xl font-serif mb-5 dark:text-cyan-300 text-cyan-700"
        >
          Blog
        </h1>
        <p class="dark:first-letter:bg-cyan-600 first-letter:bg-cyan-200">
          Welcome to my blog! Here you will find news, articles, and insights
          related to software development, programming languages, technology
          trends, and more. My goal is to provide informative and engaging
          content that is useful for developers of all levels.
        </p>
      </div>
      <DMask
        mask="owl"
        color
        outline
        class="h-full w-full flex flex-row-reverse absolute top-0 -z-10 brightness-[25%] sm:brightness-100 transition-all"
      />
    </div>

    <section v-if="pagesCount">
      <DPagination
        v-if="pagesCount > 1"
        class="mx-auto my-10 max-w-md"
        :current-page="currentPage"
        :all-pages="pagesCount"
        base-link="/blog"
      />
      <nav
        class="max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 px-2 md:px-6"
      >
        <ContentList
          v-slot="{ list }: { list: BlogContent[] }"
          :query="blogQuery"
        >
          <BlogTile
            v-for="article in list"
            :key="article._path"
            :article="article"
          />
        </ContentList>
      </nav>
      <DPagination
        v-if="pagesCount > 1"
        class="mx-auto my-10 max-w-md"
        :current-page="currentPage"
        :all-pages="pagesCount"
        base-link="/blog"
      />
    </section>
  </div>
</template>
