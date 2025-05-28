<script setup lang="ts">
import { Icon } from '#components'
import DCard from '~/components/content/DCard.vue'
import DCardTitle from '~/components/content/DCardTitle.vue'
</script>

<template>
  <DCard id="focus" mode="homepage-skills" dense>
    <DCardTitle>
      <a href="#focus"> Focus </a>
    </DCardTitle>
    <div class="text-xl text-black">
      🚀 Currently focusing on the following technologies:
      <ul class="list-disc pl-5">
        <li>
          Python
          <Icon name="vscode-icons:file-type-python" aria-hidden="true" />
        </li>
        <li>
          AI Models <Icon name="logos:hugging-face-icon" aria-hidden="true" />
        </li>
        <li>
          Vector Databases
          <Icon name="flat-color-icons:search" aria-hidden="true" />
        </li>
        <li>
          Nuxt.js <Icon name="vscode-icons:file-type-nuxt" aria-hidden="true" />
        </li>
      </ul>
    </div>
  </DCard>
</template>
