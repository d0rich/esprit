import { Toc, TocLink } from '@nuxt/content/dist/runtime/types'

export const useDocsLayoutState = () => ({
  showContentTree: useState('layout/docs/showContentTree', () => false),
  tableOfContents: useState<Toc | null>(
    'layout/docs/tableOfContents',
    () => null
  )
})

export const useTocObserver = (root: Ref<HTMLElement>) => {
  const { tableOfContents } = useDocsLayoutState()
  const highlightMap = new Map<string, boolean>()

  const observerRef = ref<IntersectionObserver | null>(null)
  const headersToHighlight = ref<string[]>([])

  function setupObserver() {
    if (observerRef.value) {
      observerRef.value.disconnect()
    } else {
      observerRef.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          highlightMap.set(entry.target.id, entry.isIntersecting)
        })
        headersToHighlight.value = Array.from(highlightMap.keys()).filter(
          (id) => highlightMap.get(id)
        )
      })
    }

    const observeLinks = (links: TocLink[]) => {
      links.forEach((link) => {
        const el = document.getElementById(link.id)
        if (el) observerRef.value?.observe(el)
        if (link.children) observeLinks(link.children)
      })
    }
    observeLinks(tableOfContents.value?.links ?? [])
  }

  watch(tableOfContents, () => {
    setTimeout(() => {
      setupObserver()
    }, 100)
  })

  useSafeOnMounted(root, () => {
    setupObserver()
  })

  return headersToHighlight
}
