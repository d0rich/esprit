<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { consola } from 'consola'
import { toNano } from '@ton/core/dist/utils/convert'
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
import { useOpenedContract } from '../features/tonconnect/composables/useOpenedContract'

const router = useRouter()

const tonConnectStore = useTonConnectStore()
const masterContractStore = useMasterContractStore()
const masterContract = useOpenedContract(masterContractStore.latestContract)
const isTestnet = useAppConfig().network === 'TESTNET'

const loading = ref(false)
let createBlogTimer: ReturnType<typeof setTimeout> | null = null
const showPossibleOptions = ref(true)

const newBlogData = ref<NftMetadata>({
  $$type: 'NftMetadata',
  image: `https://${
    isTestnet ? 'testnet.' : ''
  }d.d0rich.me/metadata/covers/blog.jpg`,
  name: '',
  description: ''
})

onBeforeUnmount(() => {
  if (createBlogTimer) {
    clearTimeout(createBlogTimer)
  }
})

async function createBlog() {
  if (loading.value) return
  if (!masterContract.value) {
    // TODO: show error
    consola.error('TON client is not initialized')
    return
  }
  loading.value = true
  createBlogTimer = setTimeout(() => {
    showPossibleOptions.value = true
  }, 5000)
  await masterContract.value.send(
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
  showPossibleOptions.value = false
}

async function goToNewBlogAddress() {
  const address = await getLastBlogAddress()
  if (!address) {
    return
  }
  router.push({
    path: `/blog/${address.toString()}`
  })
}

async function getLastBlogAddress() {
  if (!masterContract.value) {
    // TODO: show error
    consola.error('TON client is not initialized')
    return
  }
  const nextBlogIndex = await masterContract.value.getGetBlogsCount()
  return await masterContract.value.getGetBlogAddressByIndex(nextBlogIndex - 1n)
}
</script>

<template>
  <DCard class="max-w-2xl mx-auto" dense>
    <DCardTitle>Create D Blog</DCardTitle>
    <div class="px-3">
      <section v-if="showPossibleOptions" class="my-5 mx-2">
        <p class="prose dark:prose-invert prose-lg">
          It takes more time than expected. Try this options:
        </p>
        <div class="flex flex-col items-start">
          <DBtn no-rotate highlight="composite-list-item">See your blogs</DBtn>
          <DBtn
            type="none"
            class="text-left"
            no-rotate
            highlight="composite-list-item"
            @click="goToNewBlogAddress"
          >
            Go to the new blog address
          </DBtn>
        </div>
      </section>
      <form @submit.prevent="createBlog">
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
    </div>
  </DCard>
</template>

<style scoped>
.create-blog-input {
  @apply mt-1 block w-full form-input text-black;
}
</style>
