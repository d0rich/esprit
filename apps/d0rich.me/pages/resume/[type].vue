<script setup lang="ts">
import AsyncSafeSeoWithOg from '~~/components/AsyncSafeSeoWithOg.vue'
import type { ResumeData } from '~~/server/routes/api/resume/data'
import { addTrailingSlash } from '~/utils/seo'

definePageMeta({
  path: '/resume/:type?'
})

usePrintSetup()
const smallPrintStats = true

const resumeType = computed(() => useRoute().params.type as string)
const requestFetch = useRequestFetch()

const { data, error } = useAsyncData<ResumeData>(
  `/api/resume/data/${resumeType.value}`,
  () =>
    requestFetch<ResumeData>('/api/resume/data', {
      query: { resumeType: resumeType.value }
    }),
  {
    server: true
  }
)
const printResumeLink = computed(() => {
  const specialization = data.value?.lead.title?.replaceAll(' ', '_')
  return `https://cdn.d0rich.me/resume/Nikolai_Dorofeev-${specialization}.pdf`
})

const { data: resumeList } = useAsyncData(
  'resume/all',
  () => queryCollection('resume').select('path', 'title').all(),
  {
    transform: (results) =>
      results.map((r) => {
        if (r.path) r.path = r.path.replace('/resume/leads', '/resume')
        return r
      })
  }
)
</script>

<template>
  <div>
    <AsyncSafeSeoWithOg
      v-if="data"
      :title="`Resumé: ${data.lead.title}`"
      :description="data.lead.description"
    />
    <DevOnly>
      <div class="text-white bg-red-600 overflow-x-auto">
        <div>{{ error }}</div>
        <pre>{{ error?.stack }}</pre>
      </div>
    </DevOnly>

    <article
      v-if="data"
      id="resume-container"
      class="max-w-4xl mx-auto px-3 font-serif"
    >
      <h1 class="text-2xl inline-block dark:text-blue-300 print:hidden mb-5">
        Resume
      </h1>
      <nav class="flex flex-wrap print:hidden gap-4 md:gap-8">
        <DBtn
          v-for="resume in resumeList"
          :key="resume.path"
          class="max-w-[9rem] text-center"
          :to="addTrailingSlash(resume.path)"
        >
          {{ resume.title }}
        </DBtn>
      </nav>
      <section class="py-3 relative isolate overflow-hidden">
        <div class="max-w-xl">
          <div class="text-4xl sm:text-6xl mb-1">Nikolai Dorofeev</div>
          <div>
            <span class="text-3xl dark:text-blue-300 text-blue-700 mb-1">{{
              data.lead.title
            }}</span>
            <DBtn
              class="print:!hidden ml-6 pb-2"
              :href="printResumeLink"
              target="_blank"
              no-passive-highlight
            >
              Print
            </DBtn>
          </div>
          <ContentRenderer
            class="resume-page__prose-content"
            :value="data.lead"
          />
        </div>
        <DMask
          mask="wolf"
          color
          outline
          class="h-full w-full flex flex-row-reverse absolute top-0 right-0 -z-10 opacity-25 md:opacity-100 transition-all print:hidden"
        />
      </section>
      <ContentRenderer
        :value="data.contacts"
        tag="section"
        class="[&>span]:m-2 print:bg-neutral-800 print:text-white"
      />
      <section
        :class="{
          'print:grid print:grid-cols-[70%_25%] print:gap-x-[5%] small-print-stats':
            smallPrintStats
        }"
      >
        <div class="print:order-2">
          <section id="languages" class="">
            <h2 class="resume-page__section-title">Languages</h2>
            <ContentRenderer
              :value="data.languages"
              tag="section"
              class="resume-page__prose-content"
            />
          </section>
          <section id="skills" class="">
            <h2 class="resume-page__section-title">Skills</h2>
            <TransitionGroup
              name="skills-list"
              tag="div"
              class="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6"
              :class="{
                'print:flex print:flex-col print:gap-6': smallPrintStats,
                'print:text-sm print:grid-cols-3': !smallPrintStats
              }"
            >
              <ContentRenderer
                v-for="skillset in data.skills"
                :key="skillset.id"
                :value="skillset"
                class="break-inside-avoid"
              />
            </TransitionGroup>
          </section>
        </div>
        <div>
          <section id="work-experience">
            <h2 class="resume-page__section-title">Work Experience</h2>
            <ResumeTimeNote
              v-for="workPlace in data.work"
              :key="workPlace.id"
              class="my-10 print:my-8 resume-page__prose-content"
              :timenote="workPlace"
            />
          </section>
          <div>
            <section id="projects" class="">
              <h2 class="resume-page__section-title">Projects</h2>
              <ResumeProjectsCard :projects="data.projects" />
            </section>
            <section id="certificates" class="">
              <h2 class="resume-page__section-title">Certificates</h2>
              <ResumeCertificatesCard :cerificates="data.certificates" />
            </section>
          </div>
          <section id="education" class="">
            <h2 class="resume-page__section-title">Education</h2>
            <ResumeTimeNote
              v-for="eduPlace in data.education"
              :key="eduPlace.id"
              class="my-3 print:my-8 resume-page__prose-content"
              :timenote="eduPlace"
            />
          </section>
        </div>
      </section>
    </article>
    <Error404 v-else />
  </div>
</template>

<style scoped>
section {
  @apply my-10 print:my-2;
}
</style>

<style>
.resume-page__section-title {
  @apply text-5xl text-blue-700 dark:text-blue-300 mb-2 z-10
    print:text-2xl print:mt-4 break-after-avoid-page;
}

.resume-page__prose-content {
  @apply prose prose-blue dark:prose-invert print:prose-sm max-w-screen-lg;
}

#skills :is(.stats__group-title, .stats__title) {
  stroke-width: 10;
  @apply dark:stroke-blue-500 stroke-blue-200;
}

@media print {
  html {
    font-size: 12px;
  }
}
</style>

<!-- Animation -->
<style>
.skills-list-move, /* apply transition to moving elements */
.skills-list-enter-active,
.skills-list-leave-active {
  transition: all 0.5s ease;
}

.skills-list-enter-from,
.skills-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.skills-list-leave-active {
  position: absolute;
}
</style>
