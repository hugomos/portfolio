import { toFormatedDateString } from './date/toFormatedDateString'
import { decodeBase64 } from './string/decodeBase64'

export interface RepositoryDetails {
  name: string
  description: string
  readme: string
  topics: string[]
  stargazers_count: number
  homepage: string
  html_url: string
  created_at: string
  updated_at: string
}

export const getUserRepositoryBySlug = async (
  username: string,
  slug: string,
) => {
  const baseUrl = `https://api.github.com/repos/${username}/${slug}`

  const repoRes = await fetch(baseUrl)
  const readmeRes = await fetch(`${baseUrl}/contents/README.md?ref=main`)

  if (!repoRes.ok || !readmeRes.ok) return null

  const repository: RepositoryDetails = await repoRes.json()
  const readme = await readmeRes.json()

  return {
    name: repository.name,
    description: repository.description,
    readme: decodeBase64(readme.content).replaceAll(/##/g, '###'),
    topics: repository.topics.filter((topic) => topic !== 'portfolio'),
    stargazers_count: repository.stargazers_count,
    homepage: repository.homepage,
    html_url: repository.html_url,
    created_at: toFormatedDateString(repository.created_at),
    updated_at: toFormatedDateString(repository.updated_at),
  }
}
