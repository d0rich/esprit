<script setup lang="ts">
import { ref } from 'vue'
import { toNano } from 'ton-core/dist/utils/convert'
import {
  DCard,
  DCardTitle,
  DBtn,
  DAnimationSpinner
} from '@d0rich/esprit-design'
import type { NftMetadata } from '@d0rich/ton-contracts/wrappers/DSocialNetworkMaster'
import { useTonConnectStore } from '../features/tonconnect/stores/tonConnectStore'
import { useMasterContractStore } from '../features/master/stores/masterContractStore'
import { useAppConfig } from '../shared/composables/useAppConfig'
import { useContractProvider } from '../features/tonconnect/composables/useContractProvider'

const tonConnectStore = useTonConnectStore()
const masterContractStore = useMasterContractStore()
const contractProvider = useContractProvider(masterContractStore.latestContract)
const isTestnet = useAppConfig().network === 'TESTNET'

const loading = ref(false)

const newBlogData = ref<NftMetadata>({
  $$type: 'NftMetadata',
  image: `https://${
    isTestnet ? 'testnet.' : ''
  }d.d0rich.me/metadata/covers/blog.jpg`,
  name: '',
  description: ''
})

async function createBlog() {
  if (!contractProvider.value) {
    // TODO: show error
    // eslint-disable-next-line no-console
    console.error('Not connected')
    return
  }
  loading.value = true
  await masterContractStore.latestContract.send(
    contractProvider.value,
    tonConnectStore.sender,
    {
      // TODO: customize value
      value: toNano(1)
    },
    {
      $$type: 'MintNft',
      query_id: 0n,
      individual_content: newBlogData.value
    }
  )
  loading.value = false
}
</script>

<template>
  <DCard class="max-w-2xl mx-auto" dense>
    <DCardTitle>Create D Blog</DCardTitle>
    <form class="px-3" @submit.prevent="createBlog">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span>Title</span>
          <input
            v-model="newBlogData.name"
            type="text"
            class="create-blog-input"
          />
        </label>
        <label class="block">
          <span>Description</span>
          <input
            v-model="newBlogData.description"
            type="text"
            class="create-blog-input"
          />
        </label>
      </div>
      <div class="mt-5 flex justify-end">
        <DBtn type="submit" no-rotate class="text-lg">
          <template v-if="!loading">Submit</template>
          <DAnimationSpinner v-else class="w-8" />
        </DBtn>
      </div>
    </form>
  </DCard>
</template>

<style scoped>
.create-blog-input {
  @apply mt-1 block w-full form-input text-black;
}
</style>
