<script setup lang="ts">
import { Icon, DBtn, DChip, DWrapShape } from '#components'
import { queryCollection, useAsyncData } from '#imports'

const { data: socialData } = await useAsyncData('socialLinks', () =>
  queryCollection('home_lists').where('name', '=', 'Social Links').first()
)

const socialLinks = socialData.value?.items || []
</script>

<template>
  <div class="flex justify-center sm:justify-start items-center gap-6">
    <!-- To use d-cip class -->
    <DChip v-show="false" />
    <DWrapShape
      v-for="(socialLink, index) in socialLinks"
      :key="index"
      shape-class="d-chip bg-black"
      filter-class="sharp-shadow ss-br-2 ss-white"
    >
      <DBtn
        :href="socialLink.link"
        target="_blank"
        no-passive-highlight
        :aria-label="socialLink.title"
      >
        <Icon
          v-if="socialLink.icon"
          :name="socialLink.icon"
          class="m-[0.4em]"
        />
      </DBtn>
    </DWrapShape>
  </div>
</template>
