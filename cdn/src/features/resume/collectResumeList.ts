import { TypeOf } from 'zod'
import { ofetch } from 'ofetch'
import { ResumeListSchema } from '../../models/ResumeList'

export async function collectResumeList() {
  const response = await ofetch<TypeOf<typeof ResumeListSchema>>(
    'https://d0rich.me/api/resume/list'
  )
  return ResumeListSchema.parse(response)
}
