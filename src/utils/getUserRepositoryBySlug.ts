import { toFormatedDateString } from './date/toFormatedDateString'

export interface RepositoryDetails {
  name: string
  description: string
  topics: string[]
  language: string
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
  const response = await fetch(
    ` https://api.github.com/repos/${username}/${slug}`,
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch repositories: ${response.status} - ${response.statusText}`,
    )
  }

  const repository: RepositoryDetails = await response.json()

  return {
    name: repository.name,
    description: repository.description,
    topics: repository.topics.filter((topic) => topic !== 'portfolio'),
    html_url: repository.html_url,
    language: repository.language,
    stargazers_count: repository.stargazers_count,
    homepage: repository.homepage,
    created_at: toFormatedDateString(repository.created_at),
    updated_at: toFormatedDateString(repository.updated_at),
  }
}
