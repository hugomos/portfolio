import { ListAllRepositoriesResponse } from '@/server/modules/repository/application/dto/list-all-repositories'
import { NextRequest } from 'next/server'

const BASE_URL = 'https://api.github.com/'

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const { username } = params

  try {
    const response = await fetch(`${BASE_URL}users/${username}/repos`)
    if (!response.ok) return null

    let repositories: ListAllRepositoriesResponse[] = await response.json()
    repositories = repositories
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        topics: repository.topics,
        html_url: repository.html_url,
        description: repository.description,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))

    return new Response(JSON.stringify(repositories))
  } catch (error: any) {
    console.error(error.message)
    return null
  }
}
