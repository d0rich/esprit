<script setup lang="ts">
import { ref } from 'vue'
import DHeader from './components/DHeader.vue'
import DSidebar from './components/DSidebar.vue'
import DFooter from './components/DFooter.vue'

const showSideBar = ref(false)
</script>

<template>
  <DHeader v-model:show-side-bar="showSideBar" />
  <div class="flex flex-col justify-between min-h-screen">
    <div
      class="grid md:grid-cols-[1fr,_auto] lg:grid-cols-[auto,_1fr,_auto] w-full gap-y-8"
    >
      <div
        class="fixed z-10 inset-0 bg-black opacity-70 lg:hidden transition-transform"
        :class="{
          '-translate-x-[100vw]': !showSideBar
        }"
        @click="showSideBar = !showSideBar"
      />
      <DSidebar :show="showSideBar" class="order-1" />
      <main class="order-2 pt-24 overflow-hidden px-4 md:px-6 pb-[50vh]">
        <slot />
      </main>
    </div>
    <DFooter />
  </div>
</template>
