<script setup lang="ts">
import * as skillsAnimations from '~~/utils/homepage/skills'

const { data } = useAsyncData(() => queryCollection('home_skills').all())

const skillsGroups = ref<ComponentPublicInstance[]>([])

onMounted(() => {
  skillsAnimations.applyContentRevealAnimation(skillsGroups)
})
</script>

<template>
  <DWrapBackground
    id="skills"
    tag="section"
    class="overflow-hidden"
    overlay-class="skills__bg-overlay"
  >
    <template #svg>
      <div class="relative w-full h-full max-w-3xl mx-auto">
        <DAnimationHypnosis
          class="absolute inset-0 mx-auto right-2/3 top-28 w-80 -rotate-12"
        />
        <DAnimationHypnosis
          class="absolute inset-0 m-auto left-1/4 bottom-64 w-96 rotate-12"
        />
        <DAnimationHypnosis class="absolute -left-40 bottom-5 w-96" />
      </div>
    </template>
    <div class="pt-20" />
    <h1>Skills</h1>
    <div class="max-w-7xl mx-auto px-3">
      <ContentRenderer
        v-for="(doc, index) in data"
        :key="doc.id"
        :ref="
          (el) => {
            skillsGroups[index] = el as ComponentPublicInstance
          }
        "
        tag="div"
        class="skills-group"
        :value="doc"
      />
    </div>
    <div style="height: 20vh" />
  </DWrapBackground>
</template>

<style>
#skills .skills__bg-overlay {
  background: var(--d-card-x-ray--action__white),
    rgb(14 116 144 / var(--tw-bg-opacity));
  @apply backdrop-saturate-50 bg-opacity-90;
}
</style>

<style scoped>
#skills {
  @apply font-dialog bg-[url('~/assets/img/bg/skills.webp')] bg-cover bg-fixed bg-center;
}

#skills h1 {
  background: var(--d-card-x-ray--action__color),
    rgb(255 255 255 / var(--tw-bg-opacity));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  @apply text-center text-7xl sm:text-8xl pt-3 sm:mb-9 mx-2 mb-20 font-bold;
}

#skills .skills-group {
  @apply flex flex-col-reverse items-center md:flex-row
         mb-36;
}

#skills .skills-group:nth-child(2n) {
  @apply md:flex-row-reverse;
}

#skills .skills-group > :nth-child(1) {
  @apply md:w-1/3;
}

#skills .skills-group > :nth-child(2) {
  @apply md:w-2/3;
}
</style>
