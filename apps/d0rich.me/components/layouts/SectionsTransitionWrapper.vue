<script setup lang="ts">
const route = useRoute()
const currentBarVariation = computed(() => {
  if (route.path.startsWith('/projects'))
    return 'sections-transition-wrapper__bar--projects'
  if (route.path.startsWith('/blog'))
    return 'sections-transition-wrapper__bar--blog'
  if (route.path.startsWith('/resume'))
    return 'sections-transition-wrapper__bar--resume'
})
</script>

<template>
  <div class="sections-transition-wrapper">
    <div
      class="sections-transition-wrapper__bar"
      :class="currentBarVariation"
    />
  </div>
</template>

<style>
.sections-transition-wrapper {
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  @apply fixed sharp-shadow ss-neutral-50 ss-bl-3 hidden overflow-hidden print:hidden;
}

.sections-transition-wrapper__bar {
  background-image: url('~~/assets/img/page-transition-pattern.svg');
  background-size: 80px;
  background-attachment: fixed;
  clip-path: polygon(-120% 0, -100% 0, 0 100%, -20% 100%);
  transition: color 0.2s ease;
  @apply bg-green-500 w-full h-full top-0;
}

.sections-transition-wrapper__bar--projects {
  background-image: url('@d0rich/nuxt-design-system/assets/img/masks/spider-outline-color.webp');
  background-size: 160px;
  @apply bg-red-600;
}

.sections-transition-wrapper__bar--blog {
  background-image: url('@d0rich/nuxt-design-system/assets/img/masks/owl-outline-color.webp');
  background-size: 160px;
  @apply bg-cyan-600;
}

.sections-transition-wrapper__bar--resume {
  background-image: url('@d0rich/nuxt-design-system/assets/img/masks/wolf-outline-color.webp');
  background-size: 160px;
  @apply bg-blue-600;
}

#default-layout:has(.section-enter-active, .section-leave-active)
  .sections-transition-wrapper {
  display: block;
}

/* bar */
#default-layout:has(.section-enter-active, .section-leave-active)
  .sections-transition-wrapper__bar {
  transition: all var(--page-transition-length) linear;
}

#default-layout:has(.section-leave-from) .sections-transition-wrapper__bar {
  clip-path: polygon(-120% 0, -100% 0, 0 100%, -20% 100%);
}

#default-layout:has(.section-leave-to, .section-enter-from)
  .sections-transition-wrapper__bar {
  clip-path: polygon(-120% 0, 120% 0, 220% 100%, -20% 100%);
}

#default-layout:has(.section-enter-to) .sections-transition-wrapper__bar {
  clip-path: polygon(100% 0, 120% 0, 220% 100%, 200% 100%);
}
</style>
