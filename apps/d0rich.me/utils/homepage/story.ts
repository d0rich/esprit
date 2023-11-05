import { LineEdge } from '@d0rich/nuxt-design-system/types'

export function applyProgressAnimation(
  containerRef: Ref<Element | null>,
  svgRef: Ref<SVGSVGElement | null>,
  thumbPolygonRef: Ref<SVGPolygonElement | null>,
  barPolygonRef: Ref<SVGPolygonElement | null>
) {
  const [svgNode, thumbNode, barNode] = [
    svgRef.value,
    thumbPolygonRef.value,
    barPolygonRef.value
  ]
  if (!svgNode || !thumbNode || !barNode) return
  const line: LineEdge[] = [
    { left: { x: 2, y: 0 }, right: { x: 7, y: 0 } },
    { left: { x: 3, y: 10 }, right: { x: 9, y: 13 } },
    { left: { x: 1, y: 20 }, right: { x: 7, y: 20 } },
    { left: { x: 2, y: 30 }, right: { x: 7, y: 30 } },
    { left: { x: 0, y: 36 }, right: { x: 6, y: 40 } },
    { left: { x: 3, y: 47 }, right: { x: 8, y: 50 } },
    { left: { x: 1, y: 64 }, right: { x: 6, y: 60 } },
    { left: { x: 4, y: 70 }, right: { x: 9, y: 73 } },
    { left: { x: 2, y: 80 }, right: { x: 6, y: 85 } },
    { left: { x: 3, y: 92 }, right: { x: 8, y: 90 } },
    { left: { x: 0, y: 100 }, right: { x: 7, y: 100 } }
  ]

  // Scroll background from last frame
  applyStaticPoints(line, svgNode, barNode)
  // Scroll thumb animation
  const storyBoundings = getAbsoluteBoundingsGetters(containerRef, {
    y: () => -window.innerHeight
  })
  applyLinePerPointAnimation(line, svgNode, thumbNode, (point, keyframes) => {
    gsap.to(point, {
      keyframes,
      scrollTrigger: {
        scrub: 1,
        start: storyBoundings.top,
        end: storyBoundings.bottom
      }
    })
  })
}

export function applyContentRevealAnimation(
  cardsRefs: Ref<ComponentPublicInstance[]>
) {
  const cards = cardsRefs.value
  for (const card of cards) {
    gsap.from(card.$el, {
      scrollTrigger: {
        trigger: card.$el,
        scrub: 1,
        start: 'top bottom',
        end: 'top 60%'
      },
      paddingTop: '100vh',
      marginBottom: '-100vh'
    })
  }
}
