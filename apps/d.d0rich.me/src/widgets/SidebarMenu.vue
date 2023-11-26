<script setup lang="ts">
import { ref } from 'vue'
import { DBtn } from '@d0rich/esprit-design'
import TonConnect from '../features/tonconnect/ui/TonConnect.vue'
import UserAvatar from '../features/user/ui/UserAvatar.vue'
import { useTonConnectStore } from '@/features/tonconnect/stores/tonConnectStore'

const tonConnectStore = useTonConnectStore()
const navLinks = ref([
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'My blogs',
    path: '/my-blogs'
  },
  {
    title: 'Create blog',
    path: '/my-blogs/create'
  },
  {
    title: 'Settings',
    path: '/settings'
  }
])

defineEmits(['closeSidebar'])
</script>

<template>
  <div>
    <section class="flex items-center gap-4">
      <UserAvatar
        v-if="tonConnectStore.wallet"
        class="w-10"
        :wallet="tonConnectStore.wallet"
      />
      <TonConnect />
    </section>
    <nav class="my-5">
      <ul>
        <li
          v-for="link in navLinks"
          :key="link.path"
          class="items-start py-1 transition-colors"
        >
          <DBtn
            :to="link.path"
            highlight="composite-list-item"
            color-class="bg-neutral-300 dark:bg-black"
            no-rotate
            text-transform="none"
            class="!font-medium"
            @click="$emit('closeSidebar')"
          >
            {{ link.title }}
          </DBtn>
        </li>
      </ul>
    </nav>
  </div>
</template>
