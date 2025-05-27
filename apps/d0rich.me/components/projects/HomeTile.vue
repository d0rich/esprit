<script setup lang="ts">
import type { D0xigenProjectMeta } from '~~/server/utils/types'
import { DChip, Icon } from '#components'

import { dateToDayMonthYear } from '@/utils/date'

import SharedTile from '~/components/shared/Tile.vue'

defineProps<{
  project: D0xigenProjectMeta
  dense?: boolean
}>()
</script>

<template>
  <SharedTile
    :image="project.image"
    :image-alt="`Cover for project ${project.title}`"
    :path="project.url"
  >
    <div class="flex flex-col p-2">
      <h2 class="text-3xl font-bold text-red-200 mb-2 order-2">
        {{ project.title }}
      </h2>

      <p class="my-2 order-3">
        {{ project.description }}
      </p>

      <div class="text-right order-1">
        Last updated:
        <time class="font-bold">{{
          dateToDayMonthYear(project.last_updated)
        }}</time>
      </div>

      <p class="order-4">
        Complexity:
        <Icon
          v-for="num in project.complexity"
          :key="num"
          class="text-red-200"
          name="ic:sharp-star"
        />
        <Icon
          v-for="num in 5 - (project.complexity || 0)"
          :key="num"
          class="text-red-200"
          name="ic:sharp-star-outline"
        />
      </p>

      <div class="text-right mt-3 -mr-5 order-5">
        <DChip
          v-for="tag in project.tags"
          :key="tag"
          class="project-tile__link__tag"
        >
          #{{ tag }}
        </DChip>
      </div>
    </div>
  </SharedTile>
</template>

<style>
.project-tile__link__tag {
  @apply mx-1 text-lg font-bold bg-red-600;
}
</style>
