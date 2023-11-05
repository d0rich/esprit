<script lang="ts">
export default {
  name: 'DLayoutNavSidebar'
}
</script>

<script setup lang="ts">
const { showContentTree } = useDocsLayoutState()
</script>

<template>
  <aside
    class="fixed z-10 inset-0 h-screen max-w-[90%] lg:sticky lg:w-72 lg:z-0 transition-all"
    :class="{
      '-left-72 w-0': !showContentTree,
      'left-0 w-screen': showContentTree
    }"
  >
    <div class="h-full grid grid-cols-[1fr,_auto]">
      <nav class="background-container">
        <div
          class="absolute -z-10 inset-0 bg-green-400 dark:bg-green-950 opacity-80 dark:opacity-95 backdrop-saturate-0 backdrop-brightness-50"
        />
        <ContentNavigation v-slot="{ navigation }: { navigation: DNavItem[] }">
          <ul>
            <DLayoutNavSidebarRootItem
              v-for="navItem in navigation"
              :key="navItem._path"
              :nav-item="navItem"
            />
          </ul>
        </ContentNavigation>
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
  background-image: url(../../../../assets/img/it-office.png);
  @apply h-full relative px-3 pt-20 isolate z-10
         bg-cover bg-center;
}
</style>
