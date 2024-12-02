import type {
  ParsedContent,
  QueryBuilderWhere
} from '@nuxt/content'
import type { TimeNote } from '~~/components/resume/TimeNote.vue'
import type { D0xigenProjectMeta } from '~~/server/utils/types'
import { ProjectsRepository } from '~~/server/utils/repositories/projects'
import { serverQueryContent } from '#content/server'

interface TaggedParsedContent extends ParsedContent {
  tags?: string[]
  projects?: {
    tags?: string[]
  }
}

export type ResumeData = {
  lead: TaggedParsedContent
  contacts: ParsedContent
  languages: ParsedContent
  skills: TaggedParsedContent[]
  work: TimeNote[]
  projects: D0xigenProjectMeta[]
  certificates: TimeNote[]
  education: TimeNote[]
}

export default defineEventHandler(async (event) => {
  const resumeType = getQuery(event).resumeType as string
  const lead = await serverQueryContent<TaggedParsedContent>(
    event,
    'resume',
    'leads',
    resumeType
  ).findOne()
  const filterObject: QueryBuilderWhere = lead.tags
    ? {
        tags: { $containsAny: lead.tags }
      }
    : {}
  const contacts = await serverQueryContent(event, '/resume/contacts').findOne()
  const languages = await serverQueryContent(
    event,
    '/resume/languages'
  ).findOne()
  const skills = await serverQueryContent<TaggedParsedContent>(
    event,
    '/resume/skills'
  )
    .where(filterObject)
    .find()
  const work = await serverQueryContent<TimeNote>(event, '/resume/work')
    .where({ _draft: false })
    .sort({ 'daterange.end': -1 })
    .find()
  const projects = await ProjectsRepository.getProjectsByTags(
    ...(lead.projects?.tags ?? [])
  )
  const certificates = await serverQueryContent<TimeNote>(
    event,
    '/resume/certificates'
  )
    .sort({ 'daterange.end': -1 })
    .find()
  const education = await serverQueryContent<TimeNote>(
    event,
    '/resume/education'
  )
    .sort({ 'daterange.end': -1 })
    .find()
  const result: ResumeData = {
    lead,
    contacts,
    languages,
    skills,
    work,
    projects,
    certificates,
    education
  }
  return result
})
