import type { RobotsTxtOptions } from './server/routes/robots.txt'
import type { DeepPartial } from './utils/DeepPartial'

export interface D0xigenConfig {
  /**
   * Title of the website to be displayed in the browser tab and for SEO
   */
  title: string
  /**
   * Description of the website for SEO
   */
  description: string
  /**
   * URL of the website for SEO
   */
  url: string
  /**
   * Author of the website
   */
  author: string
  /**
   * Social links of the author
   */
  authorSocial?: {
    /**
     * Telegram username of the author
     */
    telegram?: `@${string}`
    /**
     * Website of the author
     */
    website?: string
    /**
     * Twitter username of the author
     */
    twitter?: `@${string}`
    /**
     * Twitter username of the website
     */
    twitterSite?: `@${string}`
  }
  /**
   * Social links of the website or the project
   */
  social?: {
    /**
     * GitHub repository of the website or the project
     */
    github?: string
  }
  /**
   * Additional SEO options
   */
  seo?: {
    /**
     * Keywords for SEO
     */
    keywords?: string[]
    /**
     * Robots.txt options
     * @see {@link RobotsTxtOptions}
     */
    robots?: RobotsTxtOptions[]
  }
  /**
   * Open Graph options
   */
  og: {
    /**
     * Path to the image for Open Graph
     * @default '/og/image.jpg'
     */
    image: string
  }
  /**
   * Additional features
   */
  features?: {
    /**
     * Google Analytics
     */
    gtag?: {
      /**
       * Google Analytics ID
       */
      id?: string
    }
  }
  /**
   * d0rich Index options
   */
  d0richIndex?: {
    /**
     * Complexity of the project from 1 to 5
     */
    complexity?: 1 | 2 | 3 | 4 | 5
    /**
     * Tags for the project
     */
    tags: string[]
    /**
     * Manually specify the date when the project was last updated
     */
    freezeUpdateDate?: Date
  }
}

declare module 'nuxt/schema' {
  interface AppConfigInput {
    d0xigen?: DeepPartial<D0xigenConfig>
  }
}

export {}
