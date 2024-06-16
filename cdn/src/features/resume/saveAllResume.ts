import { collectResumeList } from './collectResumeList'
import { getResumePdf } from './getResumePdf'
import { dist } from '../../store/dist'
import { consola } from 'consola'

export async function saveAllResume() {
  const resumeList = await collectResumeList()
  await Promise.all(
    resumeList.map(async (resume) => {
      consola.info('Saving resume: ', resume.title)
      const fileName = `Nikolai_Dorofeev-${resume.title.trim().replace(' ', '_')}.pdf`
      const pdf = await getResumePdf(resume.path)
      await dist.setItemRaw(`resume:${fileName}`, pdf)
      consola.success('Resume saved: ', fileName)
    })
  )
}
