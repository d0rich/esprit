import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const tags = z.array(z.string()).optional()
const place = z.object({
  title: z.string(),
  link: z.string().url()
})
const daterange = z.object({
  start: z.string().date(),
  end: z.string().date().optional()
})
const timeNote = z.object({
  title: z.string(),
  place,
  daterange
})

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
    }),
    // Resume
    resume: defineCollection({
      source: 'resume/leads/**.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        tags,
        projects: z.object({ tags }),
        draft: z.boolean().optional().default(false)
      })
    }),
    resume_common: defineCollection({
      source: 'resume/*.md',
      type: 'page',
      schema: z.object({})
    }),
    resume_skills: defineCollection({
      source: 'resume/skills/**.md',
      type: 'page',
      schema: z.object({
        tags
      })
    }),
    resume_work_experience: defineCollection({
      source: 'resume/work/**.md',
      type: 'page',
      schema: timeNote.extend({
        draft: z.boolean().optional().default(false)
      })
    }),
    resume_education: defineCollection({
      source: 'resume/education/**.md',
      type: 'page',
      schema: timeNote
    }),
    resume_certificates: defineCollection({
      source: 'resume/certificates/**.md',
      type: 'page',
      schema: timeNote
    })
  }
})
