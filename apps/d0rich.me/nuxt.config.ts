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
    autoImport: false
  },

  components: {
    global: false,
    dirs: []
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
      routes: ['/', '/sitemap.xml']
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark'
  },

  icon: {
    serverBundle: {
      collections: ['mdi', 'ic']
    },
    class: 'inline-block'
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'python',
            'py',
            'typescript',
            'ts',
            'javascript',
            'js',
            'bash',
            'sh',
            'yaml',
            'yml',
            'json',
            'html',
            'css',
            'scss',
            'sql'
          ],
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
