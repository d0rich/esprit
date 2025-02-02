import type {
  ResumeCollectionItem,
  ResumeCommonCollectionItem,
  ResumeSkillsCollectionItem,
  ResumeWorkExperienceCollectionItem,
  ResumeCertificatesCollectionItem,
  ResumeEducationCollectionItem
} from '@nuxt/content'
import type { D0xigenProjectMeta } from '~~/server/utils/types'
import { ProjectsRepository } from '~~/server/utils/repositories/projects'

export type ResumeData = {
  lead: ResumeCollectionItem
  contacts: ResumeCommonCollectionItem
  languages: ResumeCommonCollectionItem
  skills: ResumeSkillsCollectionItem[]
  work: ResumeWorkExperienceCollectionItem[]
  projects: D0xigenProjectMeta[]
  certificates: ResumeCertificatesCollectionItem[]
  education: ResumeEducationCollectionItem[]
}

export default defineEventHandler(async (event) => {
  const resumeType = getQuery(event).resumeType as string
  const lead = await queryCollection(event, 'resume')
    .path(`/resume/leads/${resumeType}`)
    .first()
  const sortTimeNotes = (
    a: ResumeWorkExperienceCollectionItem,
    b: ResumeWorkExperienceCollectionItem
  ) => {
    if (!a.daterange?.end && !b.daterange?.end) {
      return Number(b.daterange.start) - Number(a.daterange.start)
    }
    if (!a.daterange?.end) {
      return -1
    }
    if (!b.daterange?.end) {
      return 1
    }
    return Number(b.daterange.end) - Number(a.daterange.end)
  }
  const contacts = await queryCollection(event, 'resume_common')
    .path('/resume/contacts')
    .first()
  const languages = await queryCollection(event, 'resume_common')
    .path('/resume/languages')
    .first()
  let skills = await queryCollection(event, 'resume_skills').all()
  // If not all skills are needed, filter them by tags
  if (resumeType) {
    skills = skills.filter((skill) => {
      return skill.tags?.some((tag) => lead.tags?.includes(tag))
    })
  }
  const work = await queryCollection(event, 'resume_work_experience')
    .where('draft', '=', 0)
    .all()
  work.sort(sortTimeNotes)
  const projects = await ProjectsRepository.getProjectsByTags(
    ...(lead.projects?.tags ?? [])
  )
  const certificates = await queryCollection(event, 'resume_certificates').all()
  certificates.sort(sortTimeNotes)
  const education = await queryCollection(event, 'resume_education').all()
  education.sort(sortTimeNotes)
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
