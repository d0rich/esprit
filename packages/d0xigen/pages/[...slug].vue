<script lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

interface DocPage extends ContentCollectionItem {
  before?: ContentCollectionItem
  after?: ContentCollectionItem
}

export default {
  name: 'DocPage'
}
</script>

<script setup lang="ts">
const route = useRoute()
const { tableOfContents } = useDocsLayoutState()
const { data: doc, error } = useAsyncData<DocPage>(
  'page-data' + route.path,
  async () => {
    const docPromise = queryCollection('content').path(route.path).first()
    const surroundPromise = queryCollectionItemSurroundings(
      'content',
      route.path.replace(/\/$/, '') || '/',
      {
        fields: ['title', 'description', 'path']
      }
    )
    const [doc, surround] = await Promise.all([docPromise, surroundPromise])
    return {
      ...doc,
      before: surround[0],
      after: surround[1]
    }
  }
)

function setToc() {
  tableOfContents.value = doc.value?.body?.toc ?? null
}

onMounted(() => {
  setToc()
})
</script>

<template>
  <div>
    <DAsyncSafeMeta
      v-if="doc"
      :title="doc.title"
      :description="doc.description"
    />
    <DAsyncSafeMeta v-else-if="error" title="Page not found" />
    <NuxtLayout name="docs">
      <template v-if="doc && doc.extension === 'md'">
        <ContentRenderer
          tag="article"
          class="prose prose-green dark:prose-invert d-article"
          :value="doc"
        />
        <nav class="d-next-prev-nav">
          <DLayoutSurroundDocCard
            v-if="doc.before"
            :doc="doc.before"
            direction="before"
          />
          <DLayoutSurroundDocCard
            v-if="doc.after"
            :doc="doc.after"
            direction="after"
          />
        </nav>
      </template>
      <DError404 v-else-if="error" class="mt-[20vh]" />
    </NuxtLayout>
  </div>
</template>

<style>
.d-article {
  @apply max-w-screen-lg;
}
.d-article :is(h1, h2, h3, h4, h5, h6) {
  @apply scroll-m-20;
}
.d-next-prev-nav {
  @apply justify-center grid sm:grid-cols-2 gap-8 items-start mt-32;
}
</style>
