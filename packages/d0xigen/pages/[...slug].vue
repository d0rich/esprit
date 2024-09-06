<script lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface DocPage extends ParsedContent {
  description?: string
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
    const docPromise = queryContent(route.path).findOne()
    const surroundPromise = queryContent()
      .only(['_path', 'title', 'description'])
      // Thrailing slash is removed
      // '/' is provided for the home page
      .findSurround(route.path.replace(/\/$/, '') || '/', {
        before: 1,
        after: 1
      })
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
      <ContentRenderer v-if="doc && doc._type === 'markdown'" :value="doc">
        <ContentRendererMarkdown tag="article" class="d-article" :value="doc" />
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
      </ContentRenderer>
      <DError404 v-else-if="error" class="mt-[20vh]" />
    </NuxtLayout>
  </div>
</template>

<style>
.d-article :is(h1, h2, h3, h4, h5, h6) {
  @apply scroll-m-20;
}
.d-next-prev-nav {
  @apply justify-center grid sm:grid-cols-2 gap-8 items-start mt-32;
}
</style>
