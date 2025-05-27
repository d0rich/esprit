<template>
  <header
    :class="{
      'header-hidden': !show,
      'header-shown': show
    }"
  >
    <DShape
      class="print:hidden"
      :filter-class="`${shadowColor} header__shape-filter`"
      shape-class="dark:bg-black bg-white"
      :shape-style="{
        clipPath: 'polygon(10px 0, 0 100%, 100% calc(100% - 10px), 100% 13px)'
      }"
    >
      <div
        class="w-full h-16 flex justify-evenly items-center overflow-visible"
      >
        <DBtn to="/"> d0rich </DBtn>
        <DBtn to="/projects/"> Projects </DBtn>
        <DBtn to="/blog/"> Blog </DBtn>
        <DThemeSwitch v-if="isThemeSwitchVisible" />
      </div>
    </DShape>
  </header>
</template>

<script lang="ts">
import {
  computed,
  watch,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'
import { useRoute } from '#imports'
import { useLayoutState } from '~/composables/state'

import { DBtn, DWrapShape as DShape, DThemeSwitch } from '#components'

export default defineComponent({
  name: 'DHeader',
  components: {
    DShape,
    DThemeSwitch,
    DBtn
  },
  setup() {
    const { showHeader } = useLayoutState()
    const route = useRoute()
    let lastScrollTop = 0
    let isFreezed = false
    let freezeTimer: ReturnType<typeof setTimeout>
    function freezeHeaderDisplay() {
      if (freezeTimer) clearTimeout(freezeTimer)
      isFreezed = true
      freezeTimer = setTimeout(() => {
        isFreezed = false
      }, 1000)
    }
    function onScroll() {
      const newScroll = window.scrollY
      if (!isFreezed) {
        if (newScroll > lastScrollTop) {
          showHeader.value = false
        } else {
          showHeader.value = true
        }
      }

      watch(showHeader, () => {
        freezeHeaderDisplay()
      })
      lastScrollTop = newScroll
    }
    onBeforeMount(() => {
      window.addEventListener('scroll', onScroll)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
    })
    return {
      show: showHeader,
      shadowColor: computed(() => {
        if (route.path.startsWith('/blog'))
          return 'dark:ss-cyan-300 ss-cyan-500'
        if (route.path.startsWith('/projects'))
          return 'dark:ss-red-300 ss-red-500'
        if (route.path.startsWith('/resume'))
          return 'dark:ss-blue-300 ss-blue-500'
        return 'ss-neutral-50'
      }),
      isThemeSwitchVisible: computed(
        () => route.path.startsWith('/blog') || route.path.startsWith('/resume')
      )
    }
  }
})
</script>

<style>
.header__shape-filter {
  @apply sharp-shadow ss-b-2 ss-r-3;
}

@keyframes header-shape-enter {
  from {
    @apply ss-b-5 ss-l-5;
  }
  to {
    @apply ss-b-2 ss-r-3;
  }
}

@keyframes header-shape-leave {
  from {
    @apply ss-b-2 ss-r-3;
  }
  to {
    @apply ss-b-5 ss-r-3;
  }
}

.header-hidden:has(:focus) .d-shape__bg-filter {
  animation: none;
  @apply ss-b-2 ss-r-3;
}

.header-shown .d-shape__bg-filter {
  animation: header-shape-enter 0.5s ease-out forwards;
}

.header-hidden .d-shape__bg-filter {
  animation: header-shape-leave 0.5s ease-in forwards;
}

@keyframes header-leave {
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes header-enter {
  from {
    transform: rotate(-150deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
    opacity: 1;
  }
}

.header-shown {
  animation: header-enter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-origin: right;
}

.header-hidden {
  animation: header-leave 0.5s cubic-bezier(1, 0, 0.2, 0.4) forwards;
}

.header-hidden:has(:focus) {
  animation: none;
  transform: translateY(0) rotate(0);
  opacity: 1;
  transition: all 0.5s ease-in-out;
  transform-origin: right;
}

@media (prefers-reduced-motion: reduce) {
  .header-hidden,
  .header-hidden:has(:focus),
  .header-shown,
  .header-hidden .d-shape__bg-filter,
  .header-hidden:has(:focus) .d-shape__bg-filter,
  .header-shown .d-shape__bg-filter {
    animation: none;
    transition: none;
  }
}
</style>
