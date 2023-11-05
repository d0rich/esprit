<script lang="ts">
export default {
  name: 'DLayoutTableOfContents'
}
</script>

<script setup lang="ts">
const { tableOfContents } = useDocsLayoutState()
const root = ref<HTMLElement | null>(null)
const headersToHighlight = useTocObserver(root as Ref<HTMLElement>)
</script>

<template>
  <aside ref="root" class="top-0 md:sticky md:h-screen md:w-72">
    <div class="h-full grid md:grid-cols-[auto,_1fr]">
      <div
        class="h-full w-4 bg-black dark:bg-white hidden md:block"
        style="clip-path: polygon(100% 0, 50% 0, 0 100%, 100% 100%)"
      />
      <nav class="background-container">
        <div class="absolute -z-10 inset-0 bg-white dark:bg-black opacity-90" />
        <h2 v-if="tableOfContents?.links.length" class="mb-2">On this page:</h2>
        <ul>
          <DLayoutTableOfContentsItem
            v-for="link in tableOfContents?.links"
            :key="link.id"
            :link="link"
            :active="headersToHighlight"
          />
        </ul>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.background-container {
  background-image: url(../../../../assets/img/d-bw.webp);
  @apply h-full relative px-4 pt-20 pb-10 isolate
         bg-cover bg-center;
}
</style>
