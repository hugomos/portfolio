import { ListRepositoriesByTopicsResponse } from '@/server/modules/repository/application/dto/list-repositories-by-topics'
import { NextRequest } from 'next/server'

const BASE_URL = 'https://api.github.com/'

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const { searchParams } = new URL(req.url as string)

  const { username } = params
  const topics = searchParams.get('topics')?.split(',')

  if (!topics)
    return new Response(JSON.stringify({}), {
      status: 400,
      statusText: 'Missing topics',
    })

  try {
    const response = await fetch(`${BASE_URL}users/${username}/repos`)
    if (!response.ok) return null

    let repositories: ListRepositoriesByTopicsResponse[] = await response.json()
    repositories = repositories
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        description: repository.description,
        topics: repository.topics,
        html_url: repository.html_url,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((repository) => {
        return topics.every((topic) => repository.topics.includes(topic))
      })
      .map((repository) => ({
        ...repository,
        topics: repository.topics.filter((topic) => topic !== 'portfolio'),
      }))

    return new Response(JSON.stringify(repositories))
  } catch (error) {
    console.error(error)
    return null
  }
}
