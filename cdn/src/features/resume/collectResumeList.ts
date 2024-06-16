import { TypeOf } from 'zod'
import { ofetch } from 'ofetch'
import { ResumeListSchema } from '../../models/ResumeList'
import { config } from '../../config'
import { consola } from 'consola'

export async function collectResumeList() {
  const response = await ofetch<TypeOf<typeof ResumeListSchema>>(
    `${config.MAIN_BASE_URL}/api/resume/list.json`
  )
  const list = ResumeListSchema.parse(response)
  consola.info('Resume list collected: ', list)
  return list
}
