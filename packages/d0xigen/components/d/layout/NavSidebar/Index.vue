<script lang="ts">
export default {
  name: 'DLayoutNavSidebar'
}
</script>

<script setup lang="ts">
const { showContentTree } = useDocsLayoutState()
const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('content')
)
</script>

<template>
  <aside
    class="fixed z-10 inset-0 h-screen max-w-[90%] lg:sticky lg:w-72 lg:z-0 transition-all motion-reduce:transition-none"
    :class="{
      '-left-72 w-0': !showContentTree,
      'left-0 w-screen': showContentTree
    }"
  >
    <div class="h-full grid grid-cols-[1fr,_auto]">
      <nav class="background-container">
        <ul>
          <DLayoutNavSidebarRootItem
            v-for="navItem in navigation"
            :key="navItem._path"
            :nav-item="navItem"
          />
        </ul>
      </nav>
      <div
        class="h-full w-4 bg-black dark:bg-white"
        style="clip-path: polygon(0 0, 50% 0, 100% 100%, 0 100%)"
      />
    </div>
  </aside>
</template>

<style scoped>
.background-container {
  @apply h-full relative px-3 pt-20 isolate z-10
         bg-green-400 dark:bg-green-950;
}
</style>
