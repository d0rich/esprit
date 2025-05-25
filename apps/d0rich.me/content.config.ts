import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const tags = z.array(z.string()).optional()

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/**.md',
      type: 'page',
      schema: z.object({
        draft: z.boolean().optional().default(false),
        description: z.string().optional(),
        image: z.string().optional(),
        date: z.string().date(),
        tags
      })
    }),
    // Home page
    home_lists: defineCollection({
      source: 'homepage/lists/**.yaml',
      type: 'data',
      schema: z.object({
        name: z.string(),
        items: z
          .object({
            title: z.string(),
            icon: z.string().optional(),
            link: z.string().url().optional(),
            emoji: z.string().optional()
          })
          .array()
      })
    }),
    home_intro: defineCollection({
      source: 'homepage/intro.md',
      type: 'page',
      schema: z.object({})
    }),
    home_sections: defineCollection({
      source: 'homepage/sections/**.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        link: z.string(),
        mask: z.enum(['wolf', 'owl', 'spider'])
      })
    }),
    home_skills: defineCollection({
      source: 'homepage/skills/**.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string()
      })
    }),
    home_story: defineCollection({
      source: 'homepage/story/**/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        date: z.string().date()
      })
    })
  }
})
