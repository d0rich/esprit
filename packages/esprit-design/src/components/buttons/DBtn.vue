<script lang="ts">
import type { HighlightVariant } from '../utils/index'
import DWrapFocusHighlight from '../utils/DWrapFocusHighlight.vue'
import { useLink } from '../../composables/router'

export default {
  name: 'DBtn',
  components: {
    DWrapFocusHighlight
  }
}
</script>

<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: undefined
  },
  /**
   * If true, the highlight will be shown only if the link is exact string a URL.
   */
  exact: Boolean,
  /**
   * Turn off the highlight for active links.
   */
  noPassiveHighlight: Boolean,
  /**
   * Turn on the highlight even if the link is not active.
   */
  active: Boolean,
  noRotate: Boolean,
  tag: {
    type: String,
    default: 'button'
  },
  highlight: {
    type: String as () => HighlightVariant,
    default: undefined
  },
  colorClass: {
    type: [String, Object as () => Record<string, boolean>],
    default: ''
  },
  textTransform: {
    type: String as () => 'uppercase' | 'capitalize' | 'lowercase' | 'none',
    default: 'uppercase'
  }
})

const { linkComponent: currentComponent } = useLink(props)
</script>

<template>
  <Component
    :is="currentComponent"
    class="d-btn"
    :class="{
      'd-btn--rotated': !noRotate,
      'd-btn--uppercase': textTransform === 'uppercase',
      'd-btn--capitalize': textTransform === 'capitalize',
      'd-btn--lowercase': textTransform === 'lowercase'
    }"
    v-bind="props"
  >
    <DWrapFocusHighlight
      :variant="highlight"
      :link-exact="exact"
      :no-passive-link="noPassiveHighlight"
      :color-class="colorClass"
      :active="active"
    >
      <slot />
    </DWrapFocusHighlight>
  </Component>
</template>

<style>
.d-btn {
  @apply font-extrabold select-none relative inline-block cursor-pointer;
}

.d-btn--rotated {
  @apply -rotate-6;
}

.d-btn--uppercase {
  @apply uppercase;
}

.d-btn--capitalize {
  @apply capitalize;
}

.d-btn--lowercase {
  @apply lowercase;
}
</style>
