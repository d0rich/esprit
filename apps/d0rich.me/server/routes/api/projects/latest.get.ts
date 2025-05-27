import { defineEventHandler } from 'h3'
import { ProjectsRepository } from '~~/server/utils/repositories/projects'

export default defineEventHandler(() => {
  return ProjectsRepository.getPaginatedProjects(1, 3)
})
