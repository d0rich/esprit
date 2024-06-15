import { collectResumeList } from './collectResumeList'
import { getResumePdf } from './getResumePdf'
import { dist } from '../../store/dist'

export async function saveAllResume() {
  const resumeList = await collectResumeList()
  await Promise.all(
    resumeList.map(async (resume) => {
      const pdf = await getResumePdf(resume.path)
      await dist.setItemRaw(`resume:${resume.title}.pdf`, pdf)
    })
  )
}
