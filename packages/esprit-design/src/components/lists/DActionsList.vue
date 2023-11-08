<script lang="ts">
import DWrapFocusHighlight, {
  type HighlightVariant
} from '../utils/DWrapFocusHighlight.vue'
import DWrapShape from '../utils/DWrapShape.vue'

export default {
  name: 'DActionsList',
  components: {
    DWrapFocusHighlight,
    DWrapShape
  }
}

export type ActionListItem<TEmit = any> = {
  title: string
  emit?: TEmit
  attrs?: {
    to?: string
    href?: string
    target?: '_blank' | '_self' | '_parent' | '_top' | string
    highlightVariant?: HighlightVariant
    [k: string]: any
  }
}
</script>

<script setup lang="ts">
defineEmits(['actionFocus', 'actionUnfocus', 'actionChoose'])

defineProps({
  actions: {
    type: Array as () => ActionListItem[],
    default: () => []
  },
  listClass: {
    type: [String, Object as () => Record<string, boolean>],
    default: ''
  }
})

function getCurrentHighlightVariant(action: ActionListItem): HighlightVariant {
  if (action.attrs?.highlightVariant) return action.attrs.highlightVariant
  return 'negative-list-item'
}
</script>

<template>
  <DWrapShape shape-class="d-actions-list__shape">
    <div class="p-7">
      <div class="mb-4 font-serif text-lg">
        <slot name="header" />
      </div>

      <TransitionGroup
        name="actions"
        tag="ul"
        class="d-actions-list__list"
        :class="listClass"
      >
        <li v-for="action in actions" :key="action.title">
          <DWrapFocusHighlight
            v-bind="action.attrs"
            tag="button"
            :variant="getCurrentHighlightVariant(action)"
            no-passive-link
            @click="$emit('actionChoose', action.emit)"
            @mouseenter="$emit('actionFocus', action.emit)"
            @touchstart="$emit('actionFocus', action.emit)"
            @focusin="$emit('actionFocus', action.emit)"
            @mouseleave="$emit('actionUnfocus', action.emit)"
            @touchend="$emit('actionUnfocus', action.emit)"
            @focusout="$emit('actionUnfocus', action.emit)"
          >
            {{ action.title }}
          </DWrapFocusHighlight>
        </li>
      </TransitionGroup>
    </div>
  </DWrapShape>
</template>

<style>
.d-actions-list__shape {
  @apply dark:bg-neutral-900 dark:bg-opacity-80 backdrop-blur;
  clip-path: polygon(10px 0, 0 100%, 100% calc(100% - 10px), 100% 13px);
}

.d-actions-list__list {
  @apply relative [&_button]:font-sans [&_button]:font-bold [&_button]:text-left font-sans font-bold;
}
</style>
