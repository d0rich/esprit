<script setup lang="ts">
import { useAsyncData, useRequestFetch } from '#imports'
import { DBigBangButton } from '#components'
import ProjectTile from '~/components/projects/HomeTile.vue'

const requestFetch = useRequestFetch()
const { data: projects } = useAsyncData(
  '/projects/latest',
  () => requestFetch('/api/projects/latest'),
  {
    server: true
  }
)
</script>

<template>
  <section class="max-w-7xl mx-auto px-2 md:px-6">
    <div class="flex justify-between items-end gap-x-8 mb-10">
      <h2 class="text-5xl font-serif">
        Latest Project<span class="hidden md:inline">s</span>
      </h2>
      <DBigBangButton
        class="text-4xl font-bold"
        text="projects>"
        to="/projects/"
      />
    </div>
    <nav class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectTile
        v-for="(project, i) in projects"
        :key="project.url"
        :class="{
          'hidden md:block': i === 1,
          'hidden lg:block': i === 2
        }"
        :project="project"
      />
    </nav>
  </section>
</template>
