<script setup lang="ts">
import Dialog from '@d0rich/nuxt-design-system/components/content/ProseBlockquote.vue'
import { DWrapShape, DAnimationFloatingLetter, DBtn, Icon } from '#components'
</script>

<template>
  <DWrapShape
    tag="footer"
    class="w-full -mt-[1rem] print:hidden contain-layout"
    shape-class="bg-white dark:bg-black"
    :shape-style="{
      clipPath: 'polygon(0 0, 100% 1rem, 100% 100%, 0 100%)'
    }"
  >
    <div class="pt-[1rem]">
      <div class="max-w-screen-lg mx-auto p-6">
        <div class="flex flex-col sm:flex-row justify-between gap-4 mb-5">
          <Dialog class="italic font-serif">
            As long as I’m bein’ myself, I’ll always have somewhere I can fit
            in.
          </Dialog>
          <ul>
            <li>
              <DBtn
                href="mailto:contact@d0rich.me"
                target="_blank"
                text-transform="none"
                no-rotate
                no-passive-highlight
              >
                <div class="flex items-center gap-2">
                  <Icon name="ic:sharp-mail" class="text-xl" />
                  contact@d0rich.me
                </div>
              </DBtn>
            </li>
            <li>
              <DBtn
                href="https://github.com/d0rich"
                target="_blank"
                text-transform="none"
                no-rotate
                no-passive-highlight
              >
                <div class="flex items-center gap-2">
                  <Icon name="fa6-brands:github" class="text-xl" /> GitHub
                </div>
              </DBtn>
            </li>
            <li>
              <DBtn
                href="https://www.linkedin.com/in/d0rich/"
                target="_blank"
                text-transform="none"
                no-rotate
                no-passive-highlight
              >
                <div class="flex items-center gap-2">
                  <Icon name="fa6-brands:linkedin" class="text-xl" /> LinkedIn
                </div>
              </DBtn>
            </li>
            <li>
              <DBtn
                href="https://d0rich.t.me/"
                target="_blank"
                text-transform="none"
                no-rotate
                no-passive-highlight
              >
                <div class="flex items-center gap-2">
                  <Icon name="fa6-brands:telegram" class="text-xl" /> Telegram
                </div>
              </DBtn>
            </li>
          </ul>
        </div>
        <span class="flex items-end font-serif">
          <DAnimationFloatingLetter
            class="inline-block w-8 -mx-1"
            path-class="fill-black dark:fill-white"
          />
          <span class="hidden">D</span>
          0rich
        </span>
      </div>
    </div>
  </DWrapShape>
</template>
