<script lang="ts">
import type { CSSProperties } from 'vue'
import DWrapShape from '../utils/DWrapShape.vue'
import DBtn from '../buttons/DBtn.vue'

export type ActionFanItem<TEmit = any> = {
  title: string
  emit?: TEmit
  class?: string
  style?: CSSProperties
  shapeClass?: string
  shapeStyle?: CSSProperties
  attrs?: {
    to?: string
    href?: string
    target?: '_blank' | '_self' | '_parent' | '_top' | string
    [k: string]: any
  }
}

export default {
  name: 'DActionsFan',
  components: {
    DWrapShape,
    DBtn
  }
}
</script>

<script setup lang="ts">
defineProps({
  actions: {
    type: Array as () => ActionFanItem[],
    default: () => []
  },
  side: {
    type: String as () => 'right' | 'left',
    default: 'left'
  },
  filterClass: {
    type: [String, Object as () => Record<string, boolean>],
    default: ''
  }
})

defineEmits(['actionFocus', 'actionUnfocus', 'actionChoose'])
</script>

<template>
  <!-- TODO: Use trigonometric functions to calculate size -->
  <TransitionGroup
    name="actions"
    tag="ul"
    :style="{
      padding: `${Math.min(actions.length * 2, 15)}rem 0 ${Math.min(
        actions.length * 3,
        15
      )}rem`
    }"
  >
    <DWrapShape
      v-for="(action, index) in actions"
      :key="action.title"
      tag="li"
      class="d-actions-fan__list-item"
      :filter-class="filterClass"
      :class="{
        [action.class ?? '']: true,
        'd-actions-fan--right__list-item': side === 'right',
        'd-actions-fan--left__list-item': side === 'left'
      }"
      :style="{
        ...action.style,
        '--tw-rotate': `${
          side === 'left' ? 12 - index * 18 : -12 + index * 18
        }deg`
      }"
      :shape-class="{
        'd-actions-fan__list-item__shape': true,
        [action.shapeClass ?? '']: true,
        'd-actions-fan--right__list-item__shape': side === 'right',
        'd-actions-fan--left__list-item__shape': side === 'left'
      }"
      :shape-style="action.shapeStyle"
    >
      <div
        class="d-actions-fan__list-item__body"
        :class="{
          'd-actions-fan--right__list-item__body': side === 'right'
        }"
      >
        <DBtn
          v-bind="action.attrs"
          tag="button"
          no-passive-highlight
          @click="$emit('actionChoose', action.emit)"
          @mouseenter="$emit('actionFocus', action.emit)"
          @touchstart="$emit('actionFocus', action.emit)"
          @focusin="$emit('actionFocus', action.emit)"
          @mouseleave="$emit('actionUnfocus', action.emit)"
          @touchend="$emit('actionUnfocus', action.emit)"
          @focusout="$emit('actionUnfocus', action.emit)"
        >
          {{ action.title }}
        </DBtn>
      </div>
    </DWrapShape>
  </TransitionGroup>
</template>

<style>
.d-actions-fan__list-item__shape {
  @apply dark:bg-neutral-900;
}
.d-actions-fan--right__list-item__shape {
  clip-path: polygon(calc(100% - 10px) 0, 100% 100%, 0 40%);
}
.d-actions-fan--left__list-item__shape {
  clip-path: polygon(10px 0, 0 100%, 100% 40%);
}

.d-actions-fan__list-item {
  @apply w-full transform -my-8;
}
.d-actions-fan--right__list-item {
  @apply origin-left;
}
.d-actions-fan--left__list-item {
  @apply origin-right;
}
.d-actions-fan__list-item__body {
  @apply px-3 py-2;
}
.d-actions-fan--right__list-item__body {
  @apply flex justify-end;
}
</style>

<!-- Transition -->
<style>
.actions-enter-active,
.actions-leave-active {
  @apply transition-all;
}
.actions-enter-from {
  --tw-rotate: -90deg !important;
  @apply opacity-0;
}
.actions-leave-to {
  --tw-rotate: 90deg !important;
  @apply opacity-0;
}
</style>
