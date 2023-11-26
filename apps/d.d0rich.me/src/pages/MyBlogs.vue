<script setup lang="ts">
import { ref, type ComputedRef, onBeforeMount, watch } from 'vue'
import { consola } from 'consola'
import type { OpenedContract } from '@ton/ton'
import { DSocialNetworkBlog } from '@d0rich/ton-contracts/wrappers/DSocialNetworkBlog'
import { useTonConnectStore } from '../features/tonconnect/stores/tonConnectStore'
import { useOpenedContract } from '../features/tonconnect/composables/useOpenedContract'
import { useMasterContractStore } from '../features/master/stores/masterContractStore'
import BlogPreviewCard from '../entities/blog/ui/BlogPreviewCard.vue'
import type { Blog } from '../entities/blog/model/Blog'

const masterContractStore = useMasterContractStore()
const tonConnectStore = useTonConnectStore()
const masterContract = useOpenedContract(masterContractStore.latestContract)
const userBlogsContracts = ref<
  ComputedRef<OpenedContract<DSocialNetworkBlog> | null>[]
>([])
const blogs = ref<{ address: string; blog: Blog }[]>([])

watch(userBlogsContracts, async () => {
  console.log('Generating blogs')
  const userBlogs = userBlogsContracts.value
  const dataPromises = userBlogs.map(async (blog) => {
    if (!blog.value) {
      consola.error('Failed to open Blog contract')
      return {
        address: '',
        blog: {
          name: 'Failed to fetch',
          description: '',
          image: ''
        }
      }
    }
    const data = await blog.value?.getGetBlogInfo()
    return {
      address: blog.value.address.toString(),
      blog: data.collection_content
    }
  })
  blogs.value = await Promise.all(dataPromises)
})

async function fetchUserBlogs() {
  if (!tonConnectStore.isConnected) {
    consola.error('User is not authorized')
    return []
  }
  const dMaster = masterContract.value
  if (!dMaster) {
    consola.error('TON client is not initialized')
    return []
  }
  const blogsCount = await dMaster.getGetBlogsCount()
  const getUserBlogsPromises = Array.from(Array(Number(blogsCount)).keys()).map(
    async (index) => {
      const blogAddress = await dMaster.getGetBlogAddressByIndex(BigInt(index))
      if (!blogAddress) return null
      const blogContract = useOpenedContract(
        DSocialNetworkBlog.fromAddress(blogAddress)
      )
      if (!blogContract.value) {
        consola.error(`Failed to open Blog contract ${blogAddress.toString()}`)
        return null
      }
      const owner = await blogContract.value.getOwner()
      if (owner.toRawString() !== tonConnectStore.wallet) return null
      return blogContract
    }
  )
  const userBlogs = (await Promise.all(getUserBlogsPromises)).filter(
    (blog) => blog !== null
  )
  return userBlogs as ComputedRef<OpenedContract<DSocialNetworkBlog> | null>[]
}

onBeforeMount(async () => {
  userBlogsContracts.value = await fetchUserBlogs()
})
</script>

<template>
  <h1 class="prose dark:prose-invert">My blogs</h1>
  <nav class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <BlogPreviewCard
      v-for="blog in blogs"
      :key="blog.address"
      :blog="blog.blog"
      :address="blog.address"
    />
  </nav>
</template>
