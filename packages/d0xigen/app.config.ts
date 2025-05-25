export default defineAppConfig({
  icon: {
    mode: 'svg'
  },
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
  },
  contentMermaid: {
    color: '@nuxtjs/color-mode'
  }
})
