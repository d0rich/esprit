import { z } from 'zod'

export const ResumeSchema = z.object({
  title: z.string(),
  path: z.string()
})

export const ResumeListSchema = z.array(ResumeSchema)
