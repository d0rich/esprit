<script setup lang="ts">
import { ref, computed, useTemplateRef, onMounted, onBeforeUnmount } from 'vue'
import { DWrapBackground, DAnimationFloatingLetter } from '#components'

import LatestPosts from './LatestPosts.vue'
import LatestProjects from './LatestProjects.vue'

const projectsNode = useTemplateRef('projectsNode')
const blogNode = useTemplateRef('blogNode')
const isProjectsVisible = ref(false)
const isBlogVisible = ref(false)

const currentSection = computed<'projects' | 'blog' | null>(() => {
  if (isProjectsVisible.value) return 'projects'
  if (isBlogVisible.value) return 'blog'
  return null
})

const sectionsLineColor = computed(() => {
  if (currentSection.value === 'projects') return 'fill-red-700'
  if (currentSection.value === 'blog') return 'fill-cyan-700'
  return 'fill-green-700'
})

let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === projectsNode.value?.$el) {
          isProjectsVisible.value = entry.isIntersecting
        } else if (entry.target === blogNode.value?.$el) {
          isBlogVisible.value = entry.isIntersecting
        }
      }
    },
    {
      rootMargin: '0% 0% -33% 0%',
      threshold: 0
    }
  )
  if (blogNode.value?.$el) observer.observe(blogNode.value.$el)
  if (projectsNode.value?.$el) observer.observe(projectsNode.value.$el)
})
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <DWrapBackground id="content-latest" tag="section" class="contain-layout">
    <template #svg>
      <div class="absolute inset-0" aria-hidden="true">
        <DAnimationFloatingLetter
          class="absolute w-56 inset-0 left-1/3 mx-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-32 inset-0 bottom-1/2 right-2/3 m-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-52 inset-0 left-1/3 m-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-60 inset-0 bottom-1/3 left-3/4 m-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-48 inset-0 top-1/2 right-1/3 m-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-96 inset-0 top-3/4 left-1/4 m-auto"
          :path-class="sectionsLineColor"
        />
      </div>
      <svg
        height="100%"
        width="100%"
        class="absolute top-0 w-full h-full sharp-shadow ss-r-4 ss-b-2"
        viewBox="70 0 10 100"
        preserveAspectRatio="xMidYMin"
        aria-hidden="true"
      >
        <rect
          class="content-section-line transition-colors"
          :class="sectionsLineColor"
          x="0"
          y="0"
          width="100"
          height="100"
          fill="#fff"
        />
      </svg>
    </template>
    <div class="pt-10" />
    <div class="w-full mx-auto">
      <LatestPosts ref="blogNode" class="pb-20" />
      <LatestProjects ref="projectsNode" class="pb-10" />
    </div>
  </DWrapBackground>
</template>

<style>
#content-latest {
  background: radial-gradient(#262626, #171717);
}

#content-latest h1 {
  @apply text-center text-7xl sm:text-8xl font-serif pt-3 mb-5 sm:mb-9 mx-2 font-bold;
}

.section-description {
  @apply flex flex-col md:flex-row justify-around items-end;
}

.section-description__image {
  @apply max-w-full w-96 sharp-shadow ss-r-2 ss-b-1 self-start;
}

.section-description__text {
  @apply font-serif max-w-lg lg:max-w-xl p-10 pt-0;
  text-shadow: var(--tw-shadow-color) 1px 0 0;
}

.section-description__text > p {
  @apply mb-3;
}

.section-description__text > p::first-letter {
  background-color: var(--tw-shadow-color);
}

.section-description:nth-of-type(1) .section-description__image {
  @apply ss-red-800;
}

.section-description:nth-of-type(1) .section-description__text {
  @apply shadow-red-600;
}

.section-description:nth-of-type(2) {
  @apply md:flex-row-reverse;
}

.section-description:nth-of-type(2) .section-description__image {
  @apply ss-cyan-800 self-end;
}

.section-description:nth-of-type(2) .section-description__text {
  @apply shadow-cyan-600 sm:text-right self-start;
}

.section-description:nth-of-type(3) .section-description__image {
  @apply ss-blue-800;
}

.section-description:nth-of-type(3) .section-description__text {
  @apply shadow-blue-600;
}
</style>

<style scoped>
.content-section-line {
  clip-path: polygon(
    13px 0px,
    90px 1px,
    87px 10px,
    94px 7px,
    50px 9px,
    57px 49px,
    85px 38px,
    72px 14px,
    98px 25px,
    99px 99px,
    30px 75px,
    95px 50px,
    75px 100px,
    50px 100px,
    80px 60px,
    40px 76px,
    97px 93px,
    95px 28px,
    83px 23px,
    90px 40px,
    45px 67px,
    43px 8px,
    97px 6px,
    83px 16px,
    87px 4px,
    10px 0px
  );
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .content-section-line {
      animation: content-section-line-reveal linear both;
      animation-timeline: view(70% 50%);
    }
  }
}

@keyframes content-section-line-reveal {
  0% {
    clip-path: polygon(
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      13px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px,
      10px 0px
    );
  }

  8.33333% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      90px 1px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      87px 4px,
      10px 0px
    );
  }

  16.66667% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      87px 10px,
      87px 10px,
      87px 10px,
      87px 10px,
      87px 10px,
      87px 10px,
      87px 10px,
      87px 10px,
      87px 10px,
      87px 10px,
      83px 16px,
      83px 16px,
      83px 16px,
      83px 16px,
      83px 16px,
      83px 16px,
      83px 16px,
      83px 16px,
      83px 16px,
      83px 16px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  25% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      94px 7px,
      94px 7px,
      94px 7px,
      94px 7px,
      94px 7px,
      94px 7px,
      94px 7px,
      94px 7px,
      94px 7px,
      97px 6px,
      97px 6px,
      97px 6px,
      97px 6px,
      97px 6px,
      97px 6px,
      97px 6px,
      97px 6px,
      97px 6px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  33.33333% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      50px 9px,
      50px 9px,
      50px 9px,
      50px 9px,
      50px 9px,
      50px 9px,
      50px 9px,
      50px 9px,
      43px 8px,
      43px 8px,
      43px 8px,
      43px 8px,
      43px 8px,
      43px 8px,
      43px 8px,
      43px 8px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  41.66667% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      57px 49px,
      57px 49px,
      57px 49px,
      57px 49px,
      57px 49px,
      57px 49px,
      57px 49px,
      57px 49px,
      45px 67px,
      45px 67px,
      45px 67px,
      45px 67px,
      45px 67px,
      45px 67px,
      45px 67px,
      45px 67px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  50% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      57px 49px,
      85px 38px,
      85px 38px,
      85px 38px,
      85px 38px,
      85px 38px,
      85px 38px,
      85px 38px,
      90px 40px,
      90px 40px,
      90px 40px,
      90px 40px,
      90px 40px,
      90px 40px,
      90px 40px,
      45px 67px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  58.33333% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      57px 49px,
      85px 38px,
      72px 14px,
      72px 14px,
      72px 14px,
      72px 14px,
      72px 14px,
      72px 14px,
      83px 23px,
      83px 23px,
      83px 23px,
      83px 23px,
      83px 23px,
      83px 23px,
      90px 40px,
      45px 67px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  66.66667% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      57px 49px,
      85px 38px,
      72px 14px,
      98px 25px,
      98px 25px,
      98px 25px,
      98px 25px,
      98px 25px,
      95px 28px,
      95px 28px,
      95px 28px,
      95px 28px,
      95px 28px,
      83px 23px,
      90px 40px,
      45px 67px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  75% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      57px 49px,
      85px 38px,
      72px 14px,
      98px 25px,
      99px 99px,
      99px 99px,
      99px 99px,
      99px 99px,
      97px 93px,
      97px 93px,
      97px 93px,
      97px 93px,
      95px 28px,
      83px 23px,
      90px 40px,
      45px 67px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  83.33333% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      57px 49px,
      85px 38px,
      72px 14px,
      98px 25px,
      99px 99px,
      30px 75px,
      30px 75px,
      30px 75px,
      40px 76px,
      40px 76px,
      40px 76px,
      97px 93px,
      95px 28px,
      83px 23px,
      90px 40px,
      45px 67px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  91.66667% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      57px 49px,
      85px 38px,
      72px 14px,
      98px 25px,
      99px 99px,
      30px 75px,
      95px 50px,
      95px 50px,
      80px 60px,
      80px 60px,
      40px 76px,
      97px 93px,
      95px 28px,
      83px 23px,
      90px 40px,
      45px 67px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }

  100% {
    clip-path: polygon(
      13px 0px,
      90px 1px,
      87px 10px,
      94px 7px,
      50px 9px,
      57px 49px,
      85px 38px,
      72px 14px,
      98px 25px,
      99px 99px,
      30px 75px,
      95px 50px,
      75px 100px,
      50px 100px,
      80px 60px,
      40px 76px,
      97px 93px,
      95px 28px,
      83px 23px,
      90px 40px,
      45px 67px,
      43px 8px,
      97px 6px,
      83px 16px,
      87px 4px,
      10px 0px
    );
  }
}
</style>
