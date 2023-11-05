import { ProjectsRepository } from '../../../utils/repositories/projects'

export default defineEventHandler(() => ProjectsRepository.getProjects())
