import type { RobotsTxtOptions } from './server/routes/robots.txt'
import type { DeepPartial } from './utils/DeepPartial'

interface ThemeConfig {
  title: string
  description: string
  url: string
  author: string
  authorSocial?: {
    telegram?: `@${string}`
    website?: string
    twitter?: `@${string}`
    twitterSite?: `@${string}`
  }
  social?: {
    github?: string
  }
  seo?: {
    keywords?: string[]
    robots?: RobotsTxtOptions[]
  }
  og: {
    image: string
  }
  features?: {
    gtag?: {
      id?: string
    }
  }
  d0richIndex?: {
    complexity?: number
    tags: string[]
    freezeUpdateDate?: Date
  }
}

declare module 'nuxt/schema' {
  interface AppConfigInput {
    d0xigen?: DeepPartial<ThemeConfig>
  }
}

export default defineAppConfig({
  d0xigen: {
    title: 'd0xigen',
    description: 'My awesome docs',
    url: 'https://d0rich.me',
    author: 'Nikolai Dorofeev',
    authorSocial: {
      telegram: '@d0rich',
      website: 'https://d0rich.me',
      twitter: '@d0rich'
    },
    social: {
      github: undefined
    },
    seo: {
      keywords: [],
      robots: [{ UserAgent: '*' }, { Allow: '/' }]
    },
    og: {
      image: '/og/image.jpg'
    },
    features: {
      gtag: {
        id: 'G-XXXXXXXXXX'
      }
    },
    d0richIndex: {
      tags: []
    }
  } as ThemeConfig,
  contentMermaid: {
    color: '@nuxtjs/color-mode'
  }
})
