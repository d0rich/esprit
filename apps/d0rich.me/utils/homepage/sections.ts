import { gsap } from 'gsap/all'
import { LineEdge } from '@d0rich/nuxt-design-system/types'
import { ComponentPublicInstance } from 'nuxt/dist/app/compat/capi'

export function applyLineAnimation(
  svgRef: Ref<SVGSVGElement | null>,
  polygonRef: Ref<SVGPolygonElement | null>
) {
  if (!svgRef.value || !polygonRef.value) return
  const svgBoundings = getAbsoluteBoundingsGetters(svgRef, {
    y: () =>
      -window.innerHeight *
      (1 - 0.35 * Number(window.innerHeight < window.innerWidth))
  })
  const scrollTrigger = {
    scrub: 1,
    start: svgBoundings.top,
    end: svgBoundings.bottom
  }
  const line: LineEdge[] = [
    { left: { x: 10, y: 0 }, right: { x: 13, y: 0 } },
    { left: { x: 87, y: 4 }, right: { x: 90, y: 1 } },
    { left: { x: 83, y: 16 }, right: { x: 87, y: 10 } },
    { left: { x: 97, y: 6 }, right: { x: 94, y: 7 } },
    { left: { x: 43, y: 8 }, right: { x: 50, y: 9 } },
    { left: { x: 45, y: 67 }, right: { x: 57, y: 49 } },
    { left: { x: 90, y: 40 }, right: { x: 85, y: 38 } },
    { left: { x: 83, y: 23 }, right: { x: 72, y: 14 } },
    { left: { x: 95, y: 28 }, right: { x: 98, y: 25 } },
    { left: { x: 97, y: 93 }, right: { x: 99, y: 99 } },
    { left: { x: 40, y: 76 }, right: { x: 30, y: 75 } },
    { left: { x: 80, y: 60 }, right: { x: 95, y: 50 } },
    { left: { x: 50, y: 100 }, right: { x: 75, y: 100 } }
  ]
  applyLinePerPointAnimation(
    line,
    svgRef.value,
    polygonRef.value,
    (point, keyframes) => {
      gsap.to(point, {
        keyframes,
        scrollTrigger
      })
    }
  )
}

export function setupCurrentSectionObserver(
  sectionsRefs: Ref<Element[]>,
  currentSectionRef: Ref<'portfolio' | 'blog' | 'resume' | null>
) {
  const [projectsNode, blogNode, resumeNode] = sectionsRefs.value
  const observer = new IntersectionObserver(
    (entries) => {
      const checkIntersection = (el: Element | null) =>
        entries.some((entry) => entry.isIntersecting && entry.target === el)
      if (checkIntersection(resumeNode)) {
        currentSectionRef.value = 'resume'
      } else if (checkIntersection(blogNode)) {
        currentSectionRef.value = 'blog'
      } else if (checkIntersection(projectsNode)) {
        currentSectionRef.value = 'portfolio'
      }
    },
    {
      rootMargin: '-33% 0% -66% 0%',
      threshold: 0
    }
  )
  if (projectsNode) observer.observe(projectsNode)
  if (blogNode) observer.observe(blogNode)
  if (resumeNode) observer.observe(resumeNode)

  return () => {
    observer.disconnect()
  }
}

export function applyContentRevealAnimation(
  masksRefs: Ref<ComponentPublicInstance[]>,
  contentRefs: Ref<Element[]>
) {
  for (const content of contentRefs.value) {
    const elementsToAnimate: Element[] = []
    elementsToAnimate.push(content.children[0])
    elementsToAnimate.push(...content.children[1].children)
    gsap.from(elementsToAnimate, {
      opacity: 0,
      scrollTrigger: {
        trigger: content,
        scrub: 1,
        start: 'top 90%',
        end: 'center 66%'
      },
      stagger: 0.2
    })
  }

  for (const mask of masksRefs.value) {
    const el = mask.$el
    gsap.set(el, {
      transform: 'perspective(400px)'
    })
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        scrub: 1,
        start: 'center 90%',
        end: 'center 66%'
      },
      opacity: 0,
      rotateY: -90
    })
  }
}
