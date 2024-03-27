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
    if (!response.ok)
      return new Response(JSON.stringify({}), {
        status: 404,
        statusText: 'User or repository not found',
      })

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
    return new Response(JSON.stringify({}), {
      status: 500,
      statusText: 'Internal server error',
    })
  }
}
