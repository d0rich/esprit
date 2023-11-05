const keysToTemplates = {
  UserAgent: (input: string) => `User-agent: ${input}`,
  CrawlDelay: (input: string) => `Crawl-delay: ${input}`,
  Disallow: (input: string) => `Disallow: ${input}`,
  Allow: (input: string) => `Allow: ${input}`,
  Host: (input: string) => `Host: ${input}`,
  Sitemap: (input: string) => `Sitemap: ${input}`,
  CleanParam: (input: string) => `Clean-param: ${input}`,
  Comment: (input: string) => `# ${input}`
}

export type RobotsTxtOptions = {
  [key in keyof typeof keysToTemplates]?: string
} & {
  BlankLine?: boolean
}

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain')
  const lines: string[] = []
  const config = useAppConfig()
  for (const robotOptionsItem of config.d0xigen?.seo?.robots ?? []) {
    for (const [key, value] of Object.entries(robotOptionsItem)) {
      if (typeof value === 'string') {
        lines.push(keysToTemplates[key as keyof typeof keysToTemplates](value))
      }
    }
    if (robotOptionsItem.BlankLine) {
      lines.push('')
    }
  }
  if (config.d0xigen?.url) {
    lines.push('')
    lines.push(`Sitemap: ${config.d0xigen?.url}/sitemap.xml`)
  }
  return lines.join('\n')
})
