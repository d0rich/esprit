<script lang="ts">
import { defineComponent } from 'vue'
import type { TocLink } from '@nuxt/content'

export default defineComponent({
  name: 'DLayoutTableOfContentsItem',
  props: {
    link: {
      type: Object as () => TocLink,
      required: true
    },
    active: {
      type: Array as () => string[],
      default: () => []
    }
  },
  computed: {
    isActive() {
      return this.active.findIndex((h) => h === this.link.id) > -1
    }
  }
})
</script>

<template>
  <li>
    <DBtn
      :to="'#' + link.id"
      no-rotate
      exact
      no-passive-highlight
      :active="isActive"
      text-transform="none"
      class="!font-medium py-1"
      :class="{
        'ml-2': link.depth === 3,
        'ml-3': link.depth === 4,
        'ml-4': link.depth === 5,
        'ml-5': link.depth >= 6
      }"
    >
      {{ link.text }}
    </DBtn>
    <ul v-if="link.children && link.children.length">
      <DLayoutTableOfContentsItem
        v-for="l in link.children"
        :key="l.id"
        :active="active"
        :link="l"
      />
    </ul>
  </li>
</template>
