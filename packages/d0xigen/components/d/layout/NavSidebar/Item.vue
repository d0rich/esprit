<script lang="ts">
export default {
  name: 'DLayoutNavSidebarItem'
}
</script>

<script setup lang="ts">
defineProps<{
  navItem: DNavItem
  parentPath?: string
}>()

const { showContentTree } = useDocsLayoutState()
</script>

<template>
  <li class="items-start py-1 transition-colors">
    <DBtn
      :to="navItem._path"
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
