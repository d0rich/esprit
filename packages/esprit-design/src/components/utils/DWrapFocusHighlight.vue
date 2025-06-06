<script lang="ts">
import { computed } from 'vue'
import DWrapShape from './DWrapShape.vue'

export default {
  name: 'DWrapFocusHighlight',
  components: {
    DWrapShape
  }
}
</script>

<script setup lang="ts">
export type HighlightVariant =
  | 'tile'
  | 'negative-tile'
  | 'composite-tile'
  | 'list-item'
  | 'negative-list-item'
  | 'composite-list-item'

const props = defineProps({
  /**
   * If true, the highlight will be shown only if the link is exact string a URL.
   */
  linkExact: Boolean,
  /**
   * Turn off the highlight for active links.
   */
  noPassiveLink: Boolean,
  /**
   * Turn on the highlight even if the link is not active.
   */
  active: Boolean,
  variant: {
    type: String as () => HighlightVariant,
    default: 'negative-tile'
  },
  tag: {
    type: String,
    default: 'div'
  },
  colorClass: {
    type: [String, Object as () => Record<string, boolean>],
    default: 'd-focus-hl--default-color'
  }
})

const currentComponent = computed(() => {
  // @ts-ignore
  if (props.to || props.href) return resolveComponent('NuxtLink')
  return props.tag
})
</script>

<template>
  <DWrapShape>
    <Component
      v-bind="props"
      :is="currentComponent"
      class="d-focus-hl d-focusable"
      :class="{
        'd-focus-hl--exact': linkExact,
        'd-focus-hl--not-exact': !linkExact,
        'd-focus-hl--no-passive-link': noPassiveLink,
        'd-focus-hl--active': active
      }"
    >
      <div
        v-if="variant === 'negative-tile'"
        class="d-focus-hl__hl--negative-tile"
      />
      <div
        v-else-if="variant === 'tile' || variant === 'composite-tile'"
        class="d-focus-hl__hl--tile"
        :class="colorClass"
      />
      <div
        v-else-if="variant === 'negative-list-item'"
        class="d-focus-hl__hl--negative-list-item"
      />
      <div
        v-else-if="variant === 'list-item' || variant === 'composite-list-item'"
        class="d-focus-hl__hl--list-item"
        :class="colorClass"
      />

      <slot />

      <div
        v-if="variant === 'composite-tile'"
        class="d-focus-hl__hl--negative-tile"
      />
      <div
        v-else-if="variant === 'composite-list-item'"
        class="d-focus-hl__hl--negative-list-item"
      />
    </Component>
  </DWrapShape>
</template>

<!-- common -->
<style>
.d-focus-hl {
  @apply relative isolate;
}
.d-focus-hl--default-color {
  @apply bg-red-600;
}
</style>

<!-- negative-tile -->
<style>
.d-focus-hl:has(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile) {
  @apply w-fit;
}

.d-focus-hl > :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile) {
  width: 0%;
  height: 0%;
  top: 50%;
  left: 50%;
  content: '';
  opacity: 0;
  pointer-events: none;
  @apply absolute transition-all;
}

.d-focus-hl > .d-focus-hl__hl--negative-tile {
  @apply backdrop-invert;
}

.d-focus-hl > .d-focus-hl__hl--tile {
  @apply -z-10;
}

.d-focus-hl:hover > :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile),
.d-focusable:focus :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile) {
  opacity: 1;
  animation: hl--negative-tile-animation linear 1s infinite;
}

.d-focus-hl:hover > :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile) {
  width: 110%;
  height: 130%;
  top: -15%;
  left: -5%;
}

.d-focusable:focus :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile) {
  width: 140% !important;
  height: 200% !important;
  top: -50% !important;
  left: -20% !important;
}

:is(
    :is(
      .router-link-active
        .d-focus-hl--not-exact:not(.d-focus-hl--no-passive-link),
      .router-link-exact-active
        .d-focus-hl--exact:not(.d-focus-hl--no-passive-link)
    ),
    .d-focus-hl--active
  )
  :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile) {
  opacity: 1;
  width: 120% !important;
  height: 120% !important;
  top: -10% !important;
  left: -10% !important;
}

@keyframes hl--negative-tile-animation {
  0%,
  100% {
    transform: skew(0deg) rotate(6deg);
  }
  50% {
    transform: skew(-40deg) rotate(-6deg) scaleX(0.8);
  }
}

@media (prefers-reduced-motion: reduce) {
  .d-focus-hl > :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile) {
    transition: none;
  }

  .d-focus-hl:hover
    > :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile),
  .d-focusable:focus
    :is(.d-focus-hl__hl--negative-tile, .d-focus-hl__hl--tile) {
    animation-play-state: paused;
  }
}
</style>

<!-- list-item -->
<style>
.d-focus-hl:has(
    .d-focus-hl__hl--list-item,
    .d-focus-hl__hl--negative-list-item
  ) {
  @apply w-full;
}

.d-focus-hl
  > :is(.d-focus-hl__hl--list-item, .d-focus-hl__hl--negative-list-item) {
  width: 0%;
  height: 200%;
  top: -50%;
  left: 0;
  content: '';
  margin-left: -1.2em;
  pointer-events: none;
  clip-path: polygon(1rem 0, 0% 100%, 90% 50%);
  @apply absolute transition-all;
}

.d-focus-hl > .d-focus-hl__hl--negative-list-item {
  @apply backdrop-invert;
}

.d-focus-hl > .d-focus-hl__hl--list-item {
  @apply -z-10;
}

:is(.d-focus-hl:hover, .d-focusable:focus)
  :is(.d-focus-hl__hl--list-item, .d-focus-hl__hl--negative-list-item) {
  opacity: 1;
  animation: hl--list-item-animation 0.3s infinite;
}

.d-focus-hl:hover
  > :is(.d-focus-hl__hl--list-item, .d-focus-hl__hl--negative-list-item) {
  width: 200%;
  height: 130%;
  top: -15%;
  left: -5%;
}

.d-focusable:focus
  :is(.d-focus-hl__hl--list-item, .d-focus-hl__hl--negative-list-item) {
  width: 220% !important;
  height: 200% !important;
  top: -50% !important;
  left: -5% !important;
}

:is(
    :is(
      .router-link-active
        .d-focus-hl--not-exact:not(.d-focus-hl--no-passive-link),
      .router-link-exact-active
        .d-focus-hl--exact:not(.d-focus-hl--no-passive-link)
    ),
    .d-focus-hl--active
  )
  :is(.d-focus-hl__hl--list-item, .d-focus-hl__hl--negative-list-item) {
  opacity: 1;
  width: 220% !important;
  height: 130% !important;
  top: -15% !important;
  left: -5% !important;
}

@keyframes hl--list-item-animation {
  0%,
  100% {
    clip-path: polygon(1em 0, 0% 100%, 100% 50%);
  }
  50% {
    clip-path: polygon(1em 10%, 0% 90%, 100% 50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .d-focus-hl
    > :is(.d-focus-hl__hl--list-item, .d-focus-hl__hl--negative-list-item) {
    transition: none;
  }

  :is(.d-focus-hl:hover, .d-focusable:focus)
    :is(.d-focus-hl__hl--list-item, .d-focus-hl__hl--negative-list-item) {
    animation-play-state: paused;
  }
}
</style>
