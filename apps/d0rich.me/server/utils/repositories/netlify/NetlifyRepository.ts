export interface NetlifySite {
  id: string
  url: string
  name: string
}

export class NetlifyRepository {
  async getNetlifySites(): Promise<NetlifySite[]> {
    const response = await fetch('https://api.netlify.com/api/v1/sites', {
      headers: {
        Authorization: `Bearer ${process.env.NETLIFY_TOKEN || process.env.NUXT_PUBLIC_NETLIFY_TOKEN}`
      }
    })
    const sites = await response.json()
    return sites
  }
}
