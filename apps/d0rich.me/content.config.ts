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
