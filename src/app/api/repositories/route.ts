import { filterRepositoriesByTopics } from '@/utils/filterRepositoriesByTopics'
import { getUserRepositories } from '@/utils/getUserRepositories'
import { NextRequest } from 'next/server'

export interface Repository {
  id: number
  name: string
  description: string
  topics: string[]
  html_url: string
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url as string)

  const username = 'hugomos'
  const topics = searchParams.get('topics')?.split(',')

  if (!username || !topics) {
    return new Response(JSON.stringify([]), {
      status: 400,
      statusText: 'Missing username or topics',
    })
  }

  const repositories = await getUserRepositories(username)

  if (!repositories) {
    return new Response(JSON.stringify([]), {
      status: 500,
      statusText: 'Failed to fetch repositories',
    })
  }

  const repositoriesFiltredByTopics = filterRepositoriesByTopics(
    repositories,
    topics,
  )

  return new Response(JSON.stringify(repositoriesFiltredByTopics))
}
