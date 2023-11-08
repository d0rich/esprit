<script setup lang="ts">
import AsyncSafeSeoWithOg from '~~/components/AsyncSafeSeoWithOg.vue'
import type { ResumeData } from '~~/server/routes/api/resume/data'

definePageMeta({
  path: '/resume/:type?'
})

usePrintSetup()
const smallPrintStats = true

const resumeType = computed(() => useRoute().params.type as string)

const { data, error } = useFetch<ResumeData>('/api/resume/data', {
  query: { resumeType: resumeType.value }
})

const printResumeLink = computed(() => {
  return `/api/resume/Nikolai_Dorofeev-${data.value?.lead.title?.replaceAll(
    ' ',
    '_'
  )}.pdf`
})

const { data: resumeList } = useAsyncData(
  'resume/all',
  () =>
    queryContent('/resume/leads')
      .only(['_path' as const, 'title' as const])
      .find(),
  {
    transform: (results) =>
      results.map((r) => {
        if (r._path) r._path = r._path.replace('/resume/leads', '/resume')
        return r
      })
  }
)
</script>

<template>
  <div>
    <AsyncSafeSeoWithOg
      v-if="data"
      :title="`Resume: ${data.lead.title}`"
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
          :key="resume._path"
          class="max-w-[9rem] text-center"
          :to="addTrailingSlash(resume._path)"
          >{{ resume.title }}</DBtn
        >
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
          class="h-full absolute top-0 right-0 -z-10 brightness-[25%] md:brightness-100 transition-all print:hidden"
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
          <section id="languages" class="break-inside-avoid">
            <h2 class="resume-page__section-title">Languages</h2>
            <ContentRenderer
              :value="data.languages"
              tag="section"
              class="resume-page__prose-content"
            />
          </section>
          <section id="skills" class="break-inside-avoid">
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
                :key="skillset._id"
                :value="skillset"
              />
            </TransitionGroup>
          </section>
        </div>
        <div>
          <section id="work-experience" class="break-inside-avoid">
            <h2 class="resume-page__section-title">Work Experience</h2>
            <ResumeTimeNote
              v-for="workPlace in data.work"
              :key="workPlace._id"
              class="my-3 print:my-8 resume-page__prose-content"
              :timenote="workPlace"
            />
          </section>
          <div class="grid md:grid-cols-2 gap-x-20 print:block">
            <section id="projects" class="break-inside-avoid">
              <h2 class="resume-page__section-title">Projects</h2>
              <ResumeProjectsCard :projects="data.projects" />
            </section>
            <section id="certificates" class="break-inside-avoid">
              <h2 class="resume-page__section-title">Certificates</h2>
              <ResumeCertificatesCard :cerificates="data.certificates" />
            </section>
          </div>
          <section id="education" class="break-inside-avoid">
            <h2 class="resume-page__section-title">Education</h2>
            <ResumeTimeNote
              v-for="eduPlace in data.education"
              :key="eduPlace._id"
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
  @apply text-5xl text-blue-700 dark:text-blue-300 mb-2
    print:text-2xl print:mt-4;
}

.resume-page__prose-content {
  @apply [&_p]:!m-0 [&_p]:!mb-2 [&_p]:!text-base [&_ul]:!m-0 [&_li]:!m-0;
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
