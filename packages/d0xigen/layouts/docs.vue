<script lang="ts">
export default {
  name: 'DocsLayout'
}
</script>

<script setup lang="ts">
const { showContentTree } = useDocsLayoutState()
</script>

<template>
  <DLayoutHeader />
  <div class="flex flex-col justify-between min-h-screen">
    <div
      class="grid md:grid-cols-[1fr,_auto] lg:grid-cols-[auto,_1fr,_auto] w-full gap-y-8"
    >
      <div
        class="fixed z-10 inset-0 bg-black opacity-70 lg:hidden transition-transform"
        :class="{
          '-translate-x-[100vw]': !showContentTree
        }"
        @click="showContentTree = !showContentTree"
      />
      <DLayoutNavSidebar class="order-1" />
      <main class="order-2 md:pt-24 overflow-hidden px-4 md:px-6 pb-[50vh]">
        <slot />
      </main>
      <DLayoutTableOfContents class="order-1 md:order-3" />
    </div>
    <DLayoutFooter />
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 0.7rem;
  height: 0.4rem;
}

.dark ::-webkit-scrollbar-track {
  @apply bg-neutral-900;
}

.dark ::-webkit-scrollbar-thumb {
  @apply bg-neutral-300;
}

.dark ::-webkit-scrollbar-thumb:hover {
  @apply bg-neutral-50;
}

::-webkit-scrollbar-track {
  @apply bg-neutral-200;
}

::-webkit-scrollbar-thumb {
  @apply bg-neutral-500;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-neutral-700;
}
</style>
