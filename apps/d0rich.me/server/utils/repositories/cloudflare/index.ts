import { CloudflareRepository as CloudflareRepositorySource } from './CloudflareRepository'

export const CloudflareRepository = new CloudflareRepositorySource(
  process.env.CLOUDFLARE_API_KEY ||
    process.env.NUXT_PUBLIC_CLOUDFLARE_API_KEY ||
    ''
)
