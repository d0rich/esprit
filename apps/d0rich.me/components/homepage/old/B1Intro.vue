<script setup lang="ts">
import { ref, onMounted, type ComponentPublicInstance } from 'vue'
import { useAsyncData, queryCollection } from '#imports'

import type {
  CharacterPose,
  ActionFanItem
} from '@d0rich/nuxt-design-system/types'
import * as introAnimations from '~~/utils/homepage/intro'
import {
  DWrapBackground,
  DWrapShape,
  DAnimationAccordion,
  DAnimationHypnosis,
  DCharacter,
  DActionsFan,
  DBtn,
  ContentRenderer,
  Icon
} from '#components'

const { data } = useAsyncData(() => queryCollection('home_intro').first())

const currentPose = ref<CharacterPose>('idle')

const socialLinks = ref([
  {
    icon: 'ic:sharp-mail',
    alt: 'Email link',
    link: 'mailto:contact@d0rich.me'
  },
  {
    icon: 'fa6-brands:linkedin',
    alt: 'Linkedin link',
    link: 'https://www.linkedin.com/in/d0rich/'
  },
  {
    icon: 'fa6-brands:github',
    alt: 'Github link',
    link: 'https://github.com/d0rich'
  },
  {
    icon: 'fa6-brands:telegram',
    alt: 'Telegram link',
    link: 'https://d0rich.t.me/'
  }
])

const actions: ActionFanItem<CharacterPose>[] = [
  {
    title: 'Sitemap',
    emit: 'action',
    attrs: {
      href: '#sitemap',
      noPassiveHighlight: true
    }
  },
  {
    title: 'Skills',
    emit: 'profi',
    attrs: {
      href: '#skills',
      noPassiveHighlight: true
    }
  },
  {
    title: 'Story',
    emit: 'idle',
    attrs: {
      href: '#story',
      noPassiveHighlight: true
    }
  }
]

const introContainer = ref<Element | null>(null)
const background = ref<Element | null>(null)
const textContainer = ref<ComponentPublicInstance | null>(null)
const svgRef = ref<SVGSVGElement | null>(null)
const polygonRef = ref<SVGPolygonElement | null>(null)
const socials = ref<ComponentPublicInstance[]>([])

onMounted(() => {
  introAnimations.applyBgTransitionAnimation(
    introContainer,
    background,
    textContainer
  )
  introAnimations.applySocialLinksAnimation(socials)
  introAnimations.applyLineAnimation(svgRef, polygonRef)
})
</script>

<template>
  <section v-if="data" style="height: 200vh">
    <div class="sticky top-0">
      <div
        :ref="
          (el) => {
            introContainer = el as Element
          }
        "
        class="relative w-screen max-w-full h-screen"
      >
        <div
          id="intro-background"
          :ref="
            (el) => {
              background = el as Element
            }
          "
        />
        <DWrapShape
          :ref="
            (el: ComponentPublicInstance) => {
              textContainer = el
              return undefined
            }
          "
          class="absolute w-fit top-1/3 left-0 right-0 mx-auto z-[3]"
          shape-class="intro-shape"
        >
          <ContentRenderer
            tag="div"
            :value="data"
            class="p-10 text-xl font-serif text-center [&>p>br]:!m-0 [&>p]:!m-0"
          />
        </DWrapShape>
      </div>
      <DWrapBackground
        id="intro-background-secondary"
        dots
        :dots-style="{ clipPath: 'polygon(20% 100%, 100% 100%, 100% 0%)' }"
        overlay-class="backdrop-saturate-0 bg-green-900 bg-opacity-90"
      >
        <template #svg>
          <DAnimationHypnosis
            class="absolute landscape:h-full m-auto inset-0"
            path-class="fill-white"
          />
          <svg
            :ref="
              (el) => {
                svgRef = el as SVGSVGElement
              }
            "
            height="100%"
            width="100%"
            class="absolute inset-0 w-full max-w-6xl mx-auto h-full sharp-shadow ss-r-4 ss-b-2 ss-neutral-900"
            viewBox="80 0 20 100"
            preserveAspectRatio="xMaxYMax"
          >
            <polygon
              :ref="
                (el) => {
                  polygonRef = el as SVGPolygonElement
                }
              "
              class="fill-white"
            />
          </svg>
          <div class="absolute inset-0 overflow-hidden">
            <DAnimationAccordion
              class="absolute bottom-8 -right-20 sm:right-5 -rotate-12 w-[clamp(300px,_33%,_500px)]"
            />
          </div>
        </template>
        <div id="home-intro-section">
          <div class="relative h-full max-w-7xl mx-auto">
            <DCharacter
              :pose="currentPose"
              shape-class="fill-black"
              class="absolute self-end h-full -ml-20 sm:ml-auto mt-20 transition-all"
            />
            <DActionsFan
              :actions="actions"
              side="right"
              class="absolute top-1/2 left-1/3 w-1/2 md:w-1/3 max-w-xs z-10 text-xl md:text-2xl"
              filter-class="sharp-shadow ss-br-3 ss-neutral-50"
              @action-focus="currentPose = $event"
            />
            <div class="absolute inset-0 text-3xl md:text-4xl">
              <DWrapShape
                v-for="(socialLink, index) in socialLinks"
                :key="index"
                :ref="
                  (el: ComponentPublicInstance) => {
                    socials[index] = el
                    return undefined
                  }
                "
                class="absolute -top-1/3 left-1/2"
                shape-class="d-chip bg-black"
                filter-class="sharp-shadow ss-br-2 ss-white"
              >
                <DBtn
                  :href="socialLink.link"
                  target="_blank"
                  no-passive-highlight
                  :aria-label="socialLink.alt"
                >
                  <Icon :name="socialLink.icon" class="m-[0.4em]" />
                </DBtn>
              </DWrapShape>
            </div>
          </div>
        </div>
      </DWrapBackground>
    </div>
  </section>
</template>

<style scoped>
#intro-background {
  @apply absolute h-full w-full top-0 left-0 bg-[url('~/assets/img/bg/d-bw.webp')] bg-cover bg-center z-[2];
}
#intro-background-secondary {
  @apply bg-[url('~/assets/img/bg/it-office.webp')] bg-cover bg-center;
}
</style>

<style>
.intro-shape {
  clip-path: polygon(3% 3%, 100% 0%, 95% 95%, 0% 100%);
  animation: intro-shape-clip-path 5s linear infinite;
  @apply backdrop-invert bg-neutral-900 bg-opacity-60;
}

@keyframes intro-shape-clip-path {
  0%,
  100% {
    clip-path: polygon(3% 3%, 100% 0%, 95% 95%, 0% 100%);
  }
  25% {
    clip-path: polygon(5% 3%, 96% 4%, 96% 97%, 0 99%);
  }
  50% {
    clip-path: polygon(3% 2%, 100% 0, 90% 94%, 1% 91%);
  }
  75% {
    clip-path: polygon(4% 7%, 96% 1%, 99% 99%, 8% 95%);
  }
}

#home-intro-section {
  width: 100%;
  height: 75vh;
  min-height: 35rem;
  overflow: hidden;
  @apply relative max-w-6xl mx-auto;
}
</style>
