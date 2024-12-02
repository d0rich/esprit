<script setup lang="ts">
import { Disqus } from 'vue-disqus'
import type { MarkdownParsedContent } from '@nuxt/content'
import { addTrailingSlash } from '@/utils/seo'
import { dateToDayMonthYear } from '@/utils/date'

interface Document extends MarkdownParsedContent {
  date?: string
  image?: string
}

const slug = clearSlug(useRoute().params.slug as string[])
const { itemsOnPage, filter } = useBlogNavigationConfig()
const pagePath = ['/blog', ...slug].join('/')

const { data: doc } = useAsyncData(pagePath, async () => {
  const docPromise = queryContent<Document>('blog', ...slug).findOne()
  const surroundPromise = queryContent<Document>()
    .only(['_path', 'title', 'description'])
    .where({
      ...filter,
      _path: /^\/blog/
    })
    .findSurround(pagePath, {
      before: 1,
      after: 1
    })
  const [doc, surround] = await Promise.all([docPromise, surroundPromise])
  return {
    ...doc,
    before: surround[0] as Document,
    after: surround[1] as Document
  }
})

const { data: position } = useAsyncData(
  ['blog', ...slug, 'position'].join('/'),
  () =>
    queryContent('/blog')
      .only('_path')
      .where({
        ...filter,
        date: { $gte: Number(doc.value?.date) }
      })
      .find(),
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
        <DBigBangButton text="< Back" :to="addTrailingSlash(linkToBlog)" />
      </nav>
      <time v-if="docDate" :datetime="docDate.toISOString()">
        {{ dateToDayMonthYear(doc.date) }}
      </time>
    </div>
    <ContentRenderer
      :value="doc"
      tag="article"
      class="prose dark:prose-invert blog-article"
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
      <DBigBangButton text="< Back" :to="addTrailingSlash(linkToBlog)" />
    </nav>
    <ClientOnly>
      <Disqus
        class="blog-fonts max-w-screen-md mx-auto px-3 mt-32"
        :identifier="doc._path"
        :url="`https://d0rich.me${pagePath}`"
      />
    </ClientOnly>
  </div>
  <Error404 v-else />
</template>

<style>
.blog-article {
  @apply max-w-screen-md
         mx-auto px-3
         dark:[&_p]:first-letter:bg-cyan-800
         dark:[&_:not(blockquote)_p]:first-letter:bg-transparent
         dark:marker:text-cyan-400;
}

.blog-article :is(h1, h2, h3, h4, h5, h6) a,
.blog-article :is(h1, h2, h3, h4, h5, h6) {
  @apply dark:text-cyan-400;
}
</style>
