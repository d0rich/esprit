<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAsyncData, useRequestFetch } from '#imports'
import { definePageMeta } from '#imports'

definePageMeta({
  path: '/projects/:page(\\d+)?',
  colorMode: 'dark'
})

const route = useRoute()
const requestFetch = useRequestFetch()

const currentPage = computed(() => Number(route.params.page || 1))

const { data } = useAsyncData(
  `/api/projects/${currentPage.value}`,
  () => requestFetch(`/api/projects/${currentPage.value}`),
  {
    server: true
  }
)
</script>

<template>
  <div class="pb-[50vh]">
    <AsyncSafeSeoWithOg title="Projects" />
    <div class="relative isolate px-3 max-w-3xl mx-auto my-10 overflow-hidden">
      <div class="max-w-lg">
        <h1 class="text-6xl sm:text-8xl font-serif mb-5 text-red-300">
          Projects
        </h1>
        <p class="first-letter:bg-red-600">
          Explore my portfolio of IT projects - a collection of custom
          documentation websites that showcase my technical skills and expertise
          in solving complex IT problems with innovative solutions.
        </p>
        <p class="first-letter:bg-red-600">
          Browse through for valuable insights into my approach to information
          technology.
        </p>
      </div>
      <DMask
        mask="spider"
        color
        outline
        class="h-full w-full flex flex-row-reverse absolute top-0 -z-10 brightness-[25%] sm:brightness-100 transition-all"
      />
    </div>
    <section v-if="data">
      <DPagination
        v-if="data._pagesCount > 1"
        class="mx-auto my-10 max-w-md"
        :current-page="currentPage"
        :all-pages="data._pagesCount"
        base-link="/projects"
      />
      <nav>
        <ProjectsTile
          v-for="project in data.items"
          :key="project.url"
          :project="project"
        />
      </nav>
      <DPagination
        v-if="data._pagesCount > 1"
        class="mx-auto my-10 max-w-md"
        :current-page="currentPage"
        :all-pages="data._pagesCount"
        base-link="/projects"
      />
    </section>
  </div>
</template>
