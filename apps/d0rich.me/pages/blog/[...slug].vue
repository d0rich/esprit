<script setup lang="ts">
// @ts-ignore
import { Disqus } from 'vue-disqus'
import { withTrailingSlash } from 'ufo'
import { computed } from 'vue'
import { ClientOnly } from '#components'
import { useRoute, useAsyncData } from '#imports'
import { queryCollection, queryCollectionItemSurroundings } from '#imports'
import { Head, Meta, DBigBangButton, ContentRenderer } from '#components'

import AsyncSafeSeoWithOg from '~/components/AsyncSafeSeoWithOg.vue'
import BlogSurroundDocCard from '~/components/blog/SurroundDocCard.vue'
import Error404 from '~/components/Error404.vue'

import { getLinkToPaginatedPage } from '@d0rich/esprit-design'
import { dateToDayMonthYear } from '~/utils/date'
import { clearSlug } from '~/utils/router'
import { useBlogNavigationConfig } from '~/composables/navigation'

const slug = clearSlug(useRoute().params.slug as string[])
const { itemsOnPage } = useBlogNavigationConfig()
const pagePath = ['/blog', ...slug].join('/')

const { data: doc } = useAsyncData(pagePath, async () => {
  // TODO: Check if drafts are allowed
  const docPromise = queryCollection('blog').path(pagePath).first()
  // TODO: Check if order is correct
  const surroundPromise = queryCollectionItemSurroundings('blog', pagePath, {
    fields: ['title', 'description', 'path']
  })
  const [doc, surround] = await Promise.all([docPromise, surroundPromise])
  return {
    ...doc,
    before: surround[0],
    after: surround[1]
  }
})

const { data: position } = useAsyncData(
  ['blog', ...slug, 'position'].join('/'),
  () =>
    queryCollection('blog')
      .select('path')
      .where('draft', '=', 0)
      .orWhere((query) =>
        query
          .where('date', '<', doc.value?.date)
          .where('date', '=', doc.value?.date)
      )
      .all(),
  {
    server: true,
    transform: (result) => result.length,
    watch: [doc]
  }
)

const linkToBlog = computed(() => {
  return getLinkToPaginatedPage(
    '/blog',
    Math.floor((position.value ?? 1) / (itemsOnPage - 1) + 1)
  )
})

const docDate = computed(() => {
  if (!doc.value?.date) return undefined
  return new Date(doc.value.date)
})
</script>

<template>
  <div v-if="doc" class="pb-[50vh] pt-10">
    <AsyncSafeSeoWithOg
      :title="doc.title"
      :description="doc.description"
      :image="doc.image"
    />
    <Head>
      <Meta
        v-if="docDate"
        property="tg:published_date"
        :content="String(Math.floor(docDate.getTime() / 1000))"
      />
    </Head>
    <div class="blog-article mb-3">
      <nav class="mb-10">
        <DBigBangButton text="< Back" :to="withTrailingSlash(linkToBlog)" />
      </nav>
      <time v-if="docDate" :datetime="docDate.toISOString()">
        {{ dateToDayMonthYear(doc.date) }}
      </time>
    </div>
    <ContentRenderer
      :value="doc"
      tag="article"
      class="prose prose-cyan dark:prose-invert blog-article"
    />
    <nav
      class="blog-article justify-center grid sm:grid-cols-2 gap-8 items-start my-16"
    >
      <BlogSurroundDocCard
        v-if="doc.after"
        :doc="doc.after"
        direction="after"
      />
      <BlogSurroundDocCard
        v-if="doc.before"
        :doc="doc.before"
        direction="before"
      />
    </nav>
    <nav class="blog-article blog-fonts my-10">
      <DBigBangButton text="< Back" :to="withTrailingSlash(linkToBlog)" />
    </nav>
    <ClientOnly>
      <Disqus
        class="blog-fonts max-w-screen-md mx-auto px-3 mt-32"
        :identifier="doc.path"
        :url="`https://d0rich.me${pagePath}`"
      />
    </ClientOnly>
  </div>
  <Error404 v-else />
</template>

<style>
.blog-article {
  @apply max-w-screen-md mx-auto px-3;
}
</style>
