import type { ComponentPublicInstance, Ref } from 'vue'
import { applyLinePerPointAnimation } from '@d0rich/esprit-design'

type ScrollTrigger = Parameters<typeof gsap.to>[2]['scrollTrigger']

export function applyBgTransitionAnimation(
  containerRef: Ref<Element | null>,
  bgRef: Ref<Element | null>,
  textRef: Ref<ComponentPublicInstance | null>
) {
  const [containerNode, bgNode, textNode] = [
    containerRef.value,
    bgRef.value,
    textRef.value
  ]
  if (!(containerNode && bgNode && textNode)) return
  const introScrollTrigger = {
    scrub: 1,
    start: () => 0,
    end: () => window.innerHeight * 0.5
  }
  gsap.fromTo(
    bgNode,
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 77% 100%, 0 100%)'
    },
    {
      scrollTrigger: introScrollTrigger,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 48%, 77% 25%, 0 25%)'
    }
  )
  gsap.fromTo(
    containerNode,
    {},
    {
      scrollTrigger: introScrollTrigger,
      marginBottom: '-75vh'
    }
  )
  gsap.fromTo(
    textNode?.$el,
    {
      top: '33%'
    },
    {
      scrollTrigger: introScrollTrigger,
      top: '3%'
    }
  )
}

export function applySocialLinksAnimation(
  socialRefs: Ref<ComponentPublicInstance[]>
) {
  const [email, linkedIn, github, telegram] = socialRefs.value.map(
    (comp) => comp?.$el
  )
  if (!(linkedIn && email && github && telegram)) return

  const matchMedia = gsap.matchMedia()

  const emailScrollTrigger: ScrollTrigger = {
    scrub: 1,
    start: () => window.innerHeight * 0.1,
    end: () => window.innerHeight * 0.3
  }

  const linkedInScrollTrigger = {
    scrub: 1,
    start: () => window.innerHeight * 0.2,
    end: () => window.innerHeight * 0.4
  }

  const githubScrollTrigger = {
    scrub: 1,
    start: () => window.innerHeight * 0.4,
    end: () => window.innerHeight * 0.5
  }

  const telegramScrollTrigger = {
    scrub: 1,
    start: () => window.innerHeight * 0.35,
    end: () => window.innerHeight * 0.45
  }

  matchMedia.add('(max-width: 639px)', () => {
    gsap.to(email, {
      scrollTrigger: emailScrollTrigger,
      top: '10%',
      left: '10%',
      rotate: 354
    })

    gsap.to(linkedIn, {
      scrollTrigger: linkedInScrollTrigger,
      top: '8%',
      left: '30%',
      rotate: 360
    })

    gsap.to(github, {
      scrollTrigger: githubScrollTrigger,
      top: '10%',
      left: '50%',
      rotate: 366
    })

    gsap.to(telegram, {
      scrollTrigger: telegramScrollTrigger,
      top: '14%',
      left: '70%',
      rotate: 354
    })
  })

  matchMedia.add('(min-width: 640px) and (max-width: 767px)', () => {
    gsap.to(email, {
      scrollTrigger: emailScrollTrigger,
      top: '15%',
      left: '70%',
      rotate: 354
    })

    gsap.to(linkedIn, {
      scrollTrigger: linkedInScrollTrigger,
      top: '23%',
      left: '80%',
      rotate: 360
    })

    gsap.to(github, {
      scrollTrigger: githubScrollTrigger,
      top: '35%',
      left: '85%',
      rotate: 366
    })

    gsap.to(telegram, {
      scrollTrigger: telegramScrollTrigger,
      top: '50%',
      left: '85%',
      rotate: 354
    })
  })

  matchMedia.add('(min-width: 768px)', () => {
    gsap.to(email, {
      scrollTrigger: emailScrollTrigger,
      top: '15%',
      left: '60%',
      rotate: 354
    })

    gsap.to(linkedIn, {
      scrollTrigger: linkedInScrollTrigger,
      top: '30%',
      left: '70%',
      rotate: 360
    })

    gsap.to(github, {
      scrollTrigger: githubScrollTrigger,
      top: '23%',
      left: '80%',
      rotate: 366
    })

    gsap.to(telegram, {
      scrollTrigger: telegramScrollTrigger,
      top: '50%',
      left: '73%',
      rotate: 354
    })
  })
}

export function applyLineAnimation(
  svgRef: Ref<SVGSVGElement | null>,
  polygonRef: Ref<SVGPolygonElement | null>
) {
  const [svgNode, polygonNode] = [svgRef.value, polygonRef.value]
  if (!svgNode || !polygonNode) return
  applyLinePerPointAnimation(
    [
      { left: { x: 90, y: 0 }, right: { x: 95, y: 0 } },
      { left: { x: 50, y: 33 }, right: { x: 63, y: 35 } },
      { left: { x: 80, y: 58 }, right: { x: 85, y: 55 } },
      { left: { x: 50, y: 100 }, right: { x: 75, y: 100 } }
    ],
    svgNode,
    polygonNode,
    (point, keyframes) => {
      gsap.to(point, {
        keyframes,
        scrollTrigger: {
          scrub: 1,
          end: () => window.innerHeight * 1,
          start: () => window.innerHeight * 0.3
        }
      })
    }
  )
}
