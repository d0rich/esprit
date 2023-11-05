<script setup lang="ts">
import { D0xigenProjectMeta } from '~~/server/utils/types'

defineProps<{
  project: D0xigenProjectMeta
}>()
</script>

<template>
  <DCard class="break-inside-avoid">
    <DCardTitle>
      {{ project.title }}
      <template #extra>
        <Icon
          v-for="num in project.complexity"
          :key="num"
          name="ic:sharp-star"
        />
        <Icon
          v-for="num in 5 - (project.complexity || 0)"
          :key="num"
          name="ic:sharp-star-outline"
        />
      </template>
    </DCardTitle>
    <div class="text-blue-600 dark:text-blue-300 print:text-sm">
      <p>
        <NuxtLink
          :href="addTrailingSlash(project.url)"
          target="_blank"
          class="timenote__place-link"
        >
          {{ project.url }}
        </NuxtLink>
      </p>
    </div>
    <p>
      {{ project.description }}
    </p>
  </DCard>
</template>

<style>
a.timenote__place-link {
  @apply underline;
}
</style>
