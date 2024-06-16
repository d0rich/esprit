import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
const currentDir = dirname(fileURLToPath(import.meta.url))

const packageJson = JSON.parse(fs.readFileSync(join(currentDir, 'package.json'), 'utf-8'))

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: [
    '@d0rich/nuxt-content-mermaid',
    '@nuxt-themes/typography',
    '@d0rich/nuxt-design-system'
  ],
  app: {
    pageTransition: {
      name: 'section',
      mode: 'out-in'
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/sitemap.xml',
        '/robots.txt',
        '/CNAME',
        '/_d0rich/meta.json'
      ]
    },
    serverAssets: [
      {
        baseName: 'server:templates',
        dir: join(currentDir, './server/assets/templates')
      }
    ]
  },
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV === 'development',
      isProd: process.env.NODE_ENV === 'production',
      version: packageJson.version
    }
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark'
  },
  modules: ['@nuxt/content'],
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'one-dark-pro'
      }
    },
    // sources: {
    //   fa: {
    //     prefix: '/', // All contents inside this source will be prefixed with `/fa`
    //     driver: 'fs',
    //     base: './',
    //     ignore: /.*(?<!README\.md)$/
    //   }
    // },
    markdown: {
      remarkPlugins: ['remark-simple-plantuml'],
      rehypePlugins: {
        'rehype-external-links': {
          target: '_blank'
        }
      }
    }
  }
})
