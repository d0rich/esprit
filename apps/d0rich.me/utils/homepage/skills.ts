import { ComponentPublicInstance } from 'nuxt/dist/app/compat/capi'

export function applyContentRevealAnimation(
  skillsGroupsRefs: Ref<ComponentPublicInstance[]>
) {
  const skillsGroups = skillsGroupsRefs.value
  const matchMedia = gsap.matchMedia()
  for (let i = 0; i < skillsGroups.length; i++) {
    const group = skillsGroups[i].$el as Element
    const star = group.children[0]
    const card = group.children[1]
    const scrollTriggerOptions = {
      scrub: 1,
      start: 'top bottom',
      end: 'center 66%'
    }
    matchMedia.add('(min-width: 768px)', () => {
      gsap.from(group.children, {
        scrollTrigger: {
          trigger: group,
          ...scrollTriggerOptions
        },
        marginLeft: i % 2 === 0 ? '-100vw' : undefined,
        marginRight: i % 2 === 1 ? '-100vw' : undefined
      })
    })
    matchMedia.add('(max-width: 767px)', () => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          ...scrollTriggerOptions
        },
        marginLeft: i % 2 === 0 ? '-100vw' : undefined,
        marginRight: i % 2 === 1 ? '-100vw' : undefined,
        paddingRight: i % 2 === 0 ? '100vw' : undefined,
        paddingLeft: i % 2 === 1 ? '100vw' : undefined
      })
      gsap.from(star, {
        scrollTrigger: {
          trigger: star,
          ...scrollTriggerOptions
        },
        x: i % 2 === 0 ? '-100vw' : '100vw'
      })
    })
  }
}
