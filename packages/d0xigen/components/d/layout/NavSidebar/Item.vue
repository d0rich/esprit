<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
export default {
  name: 'DLayoutNavSidebarItem'
}
</script>

<script setup lang="ts">
defineProps<{
  navItem: ContentNavigationItem
  parentPath?: string
}>()

const { showContentTree } = useDocsLayoutState()
</script>

<template>
  <li class="items-start py-1 transition-colors">
    <DBtn
      :to="navItem.path"
      highlight="composite-list-item"
      color-class="bg-neutral-300 dark:bg-black"
      no-rotate
      text-transform="none"
      class="!font-medium"
      @click="showContentTree = false"
    >
      {{ navItem.title }}
    </DBtn>
  </li>
</template>
