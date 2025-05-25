import { defineNuxtPlugin } from '#imports'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(MotionPathPlugin)
  window.gsap = gsap
})
