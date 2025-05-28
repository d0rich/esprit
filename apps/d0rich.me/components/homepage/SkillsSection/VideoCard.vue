<script setup lang="ts">
import { Icon } from '#components'
import DCard from '~/components/content/DCard.vue'
import DCardTitle from '~/components/content/DCardTitle.vue'
</script>

<template>
  <DCard id="videos" mode="homepage-skills">
    <DCardTitle>
      <a href="#videos"> Videos </a>
    </DCardTitle>
    <div class="text-xl">
      <p class="mb-2">
        🎬 <strong
          >I like creating stunning animations and breathtaking videos.</strong
        >
      </p>
      <p>
        I used to utilize
        <strong>Adobe Premier Pro</strong> <Icon
          name="logos:adobe-premiere"
          aria-hidden="true"
        />
        and <strong>After Effects</strong> <Icon
          name="logos:adobe-after-effects"
          aria-hidden="true"
        />, however, I have recently switched to
        <strong>Affinity Designer</strong> <Icon
          name="vscode-icons:file-type-affinitydesigner"
          aria-hidden="true"
        />
        and <strong>DaVinci Resolve</strong> <Icon
          name="simple-icons:davinciresolve"
          aria-hidden="true"
        />.
      </p>
    </div>
  </DCard>
</template>
