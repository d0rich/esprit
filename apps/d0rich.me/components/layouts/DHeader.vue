<template>
  <Transition name="header">
    <header v-if="show">
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
          <DBtn to="/"> Dorich </DBtn>
          <DBtn to="/projects/"> Projects </DBtn>
          <DBtn to="/blog/"> Blog </DBtn>
          <DThemeSwitch v-if="isThemeSwitchVisible" />
        </div>
      </DShape>
    </header>
  </Transition>
</template>

<script lang="ts">
import {
  computed,
  watch,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'
import { useRoute } from '#app'
import { useLayoutState } from '~/composables/state'

import DShape from '@d0rich/nuxt-design-system/components/d/wrap/Shape.vue'
import DThemeSwitch from '@d0rich/nuxt-design-system/components/d/ThemeSwitch.vue'

export default defineComponent({
  name: 'DHeader',
  components: {
    DShape,
    DThemeSwitch
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

.header-enter-from .d-shape__bg-filter {
  @apply ss-b-5 ss-l-5;
}

.header-enter-to .d-shape__bg-filter {
  @apply ss-b-2 ss-r-3;
}

.header-leave-to .d-shape__bg-filter {
  @apply ss-b-5 ss-r-3;
}

.header-enter-active .d-shape__bg-filter {
  transition: all 0.5s ease-out;
}

.header-leave-active .d-shape__bg-filter {
  transition: all 0.5s ease-in;
}

.header-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.header-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: right;
}

.header-leave-active {
  transition: 0.5s cubic-bezier(1, 0, 0.2, 0.4);
}

.header-enter-from {
  transform: rotate(-150deg);
  opacity: 0;
}
</style>
