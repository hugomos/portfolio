import { NextRequest } from 'next/server'

export interface Repository {
  id: number
  name: string
  description: string
  topics: string[]
  html_url: string
}

async function fetchRepositoriesWithTopics(
  username: string,
  topics: string[],
): Promise<Repository[]> {
  const apiUrl = `https://api.github.com/users/${username}/repos`

  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch repositories: ${response.status} - ${response.statusText}`,
    )
  }

  const repositories = await response.json()
  const repositoriesWithTopics: Repository[] = []

  for (const repo of repositories) {
    const repoTopics = repo.topics

    topics.forEach((topic) => {
      if (repoTopics.includes(topic)) {
        const repository: Repository = {
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description || '',
          topics: repoTopics || [],
        }
        repositoriesWithTopics.push(repository)
      }
    })
  }

  return repositoriesWithTopics
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((repo) => {
      return {
        ...repo,
        topics: repo.topics.filter((topic) => topic !== 'portfolio'),
      }
    })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url as string)

  const username = searchParams.get('username')
  const topics = searchParams.get('topics')?.split(',')

  if (!username || !topics) {
    return new Response(JSON.stringify([]), {
      status: 400,
      statusText: 'Missing username or topics',
    })
  }

  const repositories = await fetchRepositoriesWithTopics(username, topics)

  return new Response(JSON.stringify(repositories))
}
