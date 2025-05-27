<script setup lang="ts">
import { Icon } from '#components'
import DStats from '~/components/content/DStats.vue'
</script>

<template>
  <DStats
    :titles="[
      'Problem Solving',
      'System Design',
      'Web3',
      'Back-End',
      'Front-End'
    ]"
    :values="[5, 4, 4, 5, 5]"
  >
    <template #icon-1>
      <Icon
        aria-hidden="true"
        name="flat-color-icons:idea"
        class="d-stats__icon--single"
      />
    </template>
    <template #icon-2>
      <Icon
        aria-hidden="true"
        name="flat-color-icons:engineering"
        class="d-stats__icon--single"
      />
    </template>
    <template #icon-3>
      <Icon
        aria-hidden="true"
        name="logos:ethereum-color"
        class="d-stats__icon--single"
      />
    </template>
    <template #icon-4>
      <Icon
        aria-hidden="true"
        name="flat-color-icons:database"
        class="d-stats__icon--single"
      />
    </template>
    <template #icon-5>
      <Icon
        aria-hidden="true"
        name="vscode-icons:file-type-html"
        class="d-stats__icon--double"
      />
      <Icon
        aria-hidden="true"
        name="vscode-icons:file-type-css"
        class="d-stats__icon--double"
      />
    </template>
  </DStats>
</template>
