export class CloudflareRepository {
  accountId: string = '20c2b312cf6d04ae9a2ae4f0861032cb'

  constructor(public readonly cloudflareApiKey: string) {}

  private getAuthHeaders<T>() {
    return {
      Authorization: 'Bearer ' + this.cloudflareApiKey
    }
  }

  async getCloudflarePagesDomains() {
    const pagesProjects = await $fetch<{
      result: {
        id: string
        name: string
        subdomain: string
        domains: string[]
      }[]
      result_info: {
        page: number
        per_page: number
        count: number
        total_count: number
      }
    }>(
      `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/pages/projects`,
      {
        headers: this.getAuthHeaders()
      }
    )
    return pagesProjects.result.flatMap((project) =>
      project.domains.filter((domain) => domain !== project.subdomain)
    )
  }
}
