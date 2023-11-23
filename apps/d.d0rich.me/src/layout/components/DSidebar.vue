<script setup lang="ts">
import SidebarMenu from '../../widgets/SidebarMenu.vue'
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <aside
    class="fixed z-10 inset-0 h-screen max-w-[90%] lg:sticky lg:w-72 lg:z-0 transition-all"
    :class="{
      '-left-72 w-0': !show,
      'left-0 w-screen': show
    }"
  >
    <div class="h-full grid grid-cols-[1fr,_auto]">
      <nav class="background-container">
        <div
          class="absolute -z-10 inset-0 bg-green-400 dark:bg-green-950 opacity-80 dark:opacity-95 backdrop-saturate-0 backdrop-brightness-50"
        />
        <SidebarMenu />
      </nav>
      <div
        class="h-full w-4 bg-black dark:bg-white"
        style="clip-path: polygon(0 0, 50% 0, 100% 100%, 0 100%)"
      />
    </div>
  </aside>
</template>

<style scoped>
.background-container {
  @apply h-full relative px-3 pt-20 isolate z-10
         bg-cover bg-center;
}
</style>
