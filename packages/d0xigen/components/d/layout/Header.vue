<script lang="ts">
export default {
  name: 'DLayoutHeader'
}
</script>

<script setup lang="ts">
const { showContentTree } = useDocsLayoutState()
const appConfig = useAppConfig()
</script>

<template>
  <DWrapShape
    tag="header"
    class="fixed top-0 z-50 left-0 right-0"
    shape-class="bg-white dark:bg-black"
    :shape-style="{
      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 1rem), 0 100%)'
    }"
  >
    <nav class="p-4 font-serif font-semibold">
      <DBtn
        tag="button"
        class="!inline-block text-2xl lg:!hidden"
        @click="showContentTree = !showContentTree"
      >
        <Icon
          :name="showContentTree ? 'ic:sharp-menu-open' : 'ic:sharp-menu'"
        />
      </DBtn>
      <NuxtLink to="/">
        <DAnimationHypnosis class="inline-block w-12 -my-2" />
        <span class="pointer-events-none">{{ appConfig.d0xigen.title }}</span>
      </NuxtLink>
      <div class="flex items-center gap-2 text-xl float-right">
        <DLayoutThemeSwitch />
        <DBtn
          v-if="appConfig.d0xigen.social?.github"
          :href="appConfig.d0xigen.social.github"
          target="_blank"
          no-rotate
        >
          <Icon name="fa6-brands:github" />
        </DBtn>
      </div>
    </nav>
  </DWrapShape>
</template>
