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
  --main-bg-image: url('~/assets/img/d-bw@0.1x.webp');
  background-image:
    var(--main-bg-image), url('~/assets/img/d-bw@0.1x.webp'),
    radial-gradient(#000, #fff);
  @apply h-full relative px-4 pt-20 pb-10 isolate
         bg-cover bg-center;
}

@media screen and (min-width: 321px) {
  .background-container {
    --main-bg-image: url('~/assets/img/bg/d-bw@0.25x.webp');
  }
}

@media screen and (min-width: 641px) {
  .background-container {
    --main-bg-image: url('~/assets/img/bg/d-bw@0.5x.webp');
  }
}

@media screen and (min-width: 1081px) {
  .background-container {
    --main-bg-image: url('~/assets/img/bg/d-bw.webp');
  }
}
</style>
