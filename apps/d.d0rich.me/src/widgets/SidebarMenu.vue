<script setup lang="ts">
import TonConnect from '../features/tonconnect/ui/TonConnect.vue'
import UserAvatar from '../features/user/ui/UserAvatar.vue'
import { useTonConnectStore } from '@/features/tonconnect/stores/tonConnectStore'

const tonConnectStore = useTonConnectStore()
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
  </div>
</template>
