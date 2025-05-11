import { defineEventHandler } from 'h3'
import { useAppConfig } from '#imports'

export default defineEventHandler(() => {
  const appConfig = useAppConfig()
  return {
    title: appConfig.d0xigen.title,
    description: appConfig.d0xigen.description,
    last_updated: (
      appConfig.d0xigen.d0richIndex?.freezeUpdateDate ?? new Date()
    ).toISOString(),
    url: appConfig.d0xigen.url,
    image: appConfig.d0xigen.url + appConfig.d0xigen.og.image,
    complexity: appConfig.d0xigen.d0richIndex?.complexity,
    tags: appConfig.d0xigen.d0richIndex?.tags
  }
})
