import { defineEventHandler } from 'h3'
import { useAppConfig } from '#imports'

export default defineEventHandler((event) => {
  const appConfig = useAppConfig()
  setResponseHeader(event, 'Content-Type', 'text/plain')
  const url = appConfig.d0xigen.url
  if (url.startsWith('https://')) {
    return url.slice(8).replaceAll('/', '')
  }
  if (url.startsWith('http://')) {
    return url.slice(7).replaceAll('/', '')
  }
  return url.replaceAll('/', '')
})
