<script setup lang="ts">
import { Icon, DBtn, DChip, DWrapShape } from '#components'
const socialLinks = [
  {
    icon: 'ic:sharp-mail',
    alt: 'Email link',
    link: 'mailto:n.dorofeev.pro@gmail.com'
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
]
</script>

<template>
  <div class="flex justify-center sm:justify-start items-center gap-6">
    <!-- To use d-cip class -->
    <DChip v-show="false" />
    <DWrapShape
      v-for="(socialLink, index) in socialLinks"
      :key="index"
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
</template>
