// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: ['@d0rich/nuxt-design-system'],

  app: {
    pageTransition: {
      name: 'section',
      mode: 'out-in'
    }
  },

  css: ['assets/css/theme.css'],

  imports: {
    dirs: ['composables/*/index.{ts,js,mjs,mts}']
  },

  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV === 'development',
      isProd: process.env.NODE_ENV === 'production'
    }
  },

  modules: ['@nuxt/content'],

  nitro: {
    prerender: {
      routes: ['/', '/sitemap.xml', '/api/resume/list.json']
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark'
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['python', 'py'],
          theme: {
            default: 'github-light',
            dark: 'one-dark-pro'
          }
        },
        remarkPlugins: {
          'remark-simple-plantuml': {}
        },
        rehypePlugins: {
          'rehype-external-links': {
            target: '_blank'
          }
        }
      }
    }
  },

  compatibilityDate: '2024-12-02'
})
