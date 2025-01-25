import { resolveDynamicComponent, computed } from 'vue'
import type { RouterLink as _RouterLink, RouteLocationRaw } from 'vue-router'

export interface LinkProps {
  readonly href?: string
  readonly replace?: boolean
  readonly to?: RouteLocationRaw
  readonly exact?: boolean
  readonly tag?: string
}

export function useLink(props: LinkProps) {
  const RouterLink = resolveDynamicComponent('RouterLink') as
    | typeof _RouterLink
    | string
  const NuxtLink =
    // @ts-ignore
    typeof defineNuxtLink === 'function'
      ? // @ts-ignore
        (defineNuxtLink({
          componentName: 'DNuxtLink'
        }) as typeof _RouterLink)
      : undefined

  const isLink = computed(() => !!(props.href || props.to))
  const isExternalLink = computed(() => {
    if (!props.href) return false
    const href = props.href
    return (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    )
  })
  const propsToProvide = computed(() => {
    const propsToProvide: Record<string, any> = { ...props }
    if (props.href && props.to) {
      delete propsToProvide.href
    } else if (props.href) {
      delete propsToProvide.to
    } else if (props.to) {
      delete propsToProvide.href
    }
    return propsToProvide
  })

  if (isLink.value) {

    if (isExternalLink.value) {
      return {
        isLink,
        isExternalLink,
        linkComponent: 'a',
        propsToProvide
      }
    }

    if (typeof NuxtLink !== 'undefined') {
      return {
        isLink,
        isExternalLink,
        linkComponent: NuxtLink,
        propsToProvide
      }
    }

    if (typeof RouterLink !== 'string') {
      return {
        isLink,
        isExternalLink,
        linkComponent: RouterLink,
        propsToProvide
      }
    }

    return {
      isLink,
      isExternalLink,
      linkComponent: 'a',
      propsToProvide
    }
  }

  return {
    isLink,
    isExternalLink,
    linkComponent: props.tag || 'span',
    propsToProvide
  }
}
