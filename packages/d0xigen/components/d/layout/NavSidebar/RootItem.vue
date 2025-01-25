<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
export default {
  name: 'DLayoutNavSidebarRootItem'
}
</script>

<script setup lang="ts">
const props = defineProps<{
  navItem: ContentNavigationItem
  parentPath?: string
}>()

const route = useRoute()

const { showContentTree } = useDocsLayoutState()
const showChildren = ref(false)
const isActive = computed(() => {
  const path = props.navItem.path
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
})
const haveChildren = computed(() => {
  return !!props.navItem.children && !!props.navItem.children.length
})

const wrapIcon = computed(() =>
  !showChildren.value ? 'ic:sharp-chevron-right' : 'ic:sharp-expand-more'
)

onBeforeMount(() => {
  showChildren.value = isActive.value
})

function onClick() {
  if (haveChildren.value) {
    showChildren.value = !showChildren.value
  } else {
    showContentTree.value = false
  }
}
</script>

<template>
  <li class="py-1">
    <div>
      <DBtn
        :to="haveChildren ? undefined : navItem.path"
        highlight="composite-list-item"
        color-class="bg-neutral-300 dark:bg-black"
        no-rotate
        text-transform="none"
        @click="onClick"
      >
        <div class="grid grid-cols-[24px_1fr]">
          <Icon v-if="haveChildren" :name="wrapIcon" class="text-2xl" />
          <div v-else />
          <span>{{ navItem.title }}</span>
        </div>
      </DBtn>
      <ul v-show="haveChildren && showChildren" class="pl-8">
        <DLayoutNavSidebarItem
          v-for="child in navItem.children"
          :key="child.path"
          :nav-item="child"
          :parent-path="navItem.path"
        />
      </ul>
    </div>
  </li>
</template>
