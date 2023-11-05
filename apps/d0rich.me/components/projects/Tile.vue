<script lang="ts">
import type { D0xigenProjectMeta } from '~~/server/utils/types'
export default {
  name: 'ProjectsTile'
}
</script>

<script setup lang="ts">
defineProps<{
  project: D0xigenProjectMeta
}>()
</script>

<template>
  <div
    class="project-tile overflow-x-hidden"
    :style="{
      '--page-bg-color': 'rgb(23 23 23 / var(--tw-bg-opacity))'
    }"
  >
    <div class="project-tile__frame--top" />
    <div class="project-tile__frame--bottom" />
    <NuxtLink class="project-tile__link" :to="addTrailingSlash(project.url)">
      <div class="project-tile__link__image-wrapper">
        <div
          class="project-tile__link__image"
          :style="`background-image: url(${project.image});`"
        />
      </div>
      <div class="project-tile__link-image-overlay" />
      <div style="height: 5rem; pointer-events: none" />
      <div class="max-w-2xl mx-auto px-3">
        <DWrapShape
          shape-class="bg-black bg-opacity-90"
          shape-style="clip-path: var(--shape-card);"
        >
          <div style="padding: var(--shape-card-padding)">
            <div class="text-right">
              Last updated:
              <time class="font-bold">{{
                dateToDayMonthYear(project.last_updated)
              }}</time>
            </div>
            <h2 class="text-3xl font-bold text-red-200 mb-2">
              {{ project.title }}
            </h2>

            <p class="my-2">
              {{ project.description }}
            </p>

            <p>
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

            <div class="text-right mt-3 -mr-5">
              <DChip
                v-for="tag in project.tags"
                :key="tag"
                class="project-tile__link__tag"
              >
                #{{ tag }}
              </DChip>
            </div>
          </div>
        </DWrapShape>
      </div>
      <div style="height: 5rem; pointer-events: none" />
    </NuxtLink>
  </div>
</template>

<style>
.project-tile {
  @apply relative isolate;
}

.project-tile__frame--top,
.project-tile__frame--bottom {
  @apply absolute border-solid w-full h-8 z-50;
}

.project-tile__frame--top {
  border-width: 2rem 100vw 0 0;
  border-color: var(--page-bg-color) transparent transparent transparent;
  @apply top-0;
}

.project-tile__frame--bottom {
  border-width: 0 0 2rem 100vw;
  border-color: transparent transparent var(--page-bg-color) transparent;
  @apply bottom-0;
}

.project-tile__link {
  overflow: hidden;
  @apply relative;
}

.project-tile__link__image-wrapper {
  @apply absolute inset-0 w-full h-full overflow-hidden -z-20;
}

.project-tile__link__image {
  transition: all 0.5s ease-in-out;
  width: 100%;
  height: 100%;
  @apply bg-cover bg-center;
}

.project-tile__link:hover .project-tile__link__image {
  width: 120%;
  height: 120%;
  transform: translate(-10%, -10%) rotate(-2deg);
}

.project-tile__link-image-overlay {
  background-color: var(--page-bg-color);
  @apply absolute -z-10 inset-0 opacity-50 bg-red-900;
}

.project-tile__link__tag {
  @apply mx-1 text-lg font-bold bg-red-600;
}
</style>
