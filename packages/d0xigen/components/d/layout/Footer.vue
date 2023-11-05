<script lang="ts">
export default {
  name: 'DLayoutFooter'
}
</script>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <DWrapShape
    tag="footer"
    class="w-full -mt-[1rem]"
    shape-class="bg-white dark:bg-black"
    :shape-style="{
      clipPath: 'polygon(0 0, 100% 1rem, 100% 100%, 0 100%)'
    }"
  >
    <div class="pt-[1rem]">
      <div class="p-6 flex justify-between">
        <NuxtLink
          class="flex items-end font-serif hover:underline"
          to="https://d0rich.me"
          target="_blank"
        >
          <DAnimationFloatingLetter
            class="inline-block w-8 -mx-1"
            path-class="fill-black dark:fill-white"
          />
          eveloped by d0rich
        </NuxtLink>
        <div class="flex items-center gap-2 text-xl">
          <DBtn
            v-if="appConfig.d0xigen.social?.github"
            :href="appConfig.d0xigen.social.github"
            target="_blank"
            no-rotate
          >
            <Icon name="fa6-brands:github" />
          </DBtn>
        </div>
      </div>
    </div>
  </DWrapShape>
</template>
