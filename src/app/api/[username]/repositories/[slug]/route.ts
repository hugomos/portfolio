import { FindRepositoryBySlugResponse } from '@/server/modules/repository/application/dto/find-repository-by-slug'
import { toFormatedDateString } from '@/utils/date/toFormatedDateString'
import { decodeBase64 } from '@/utils/string/decodeBase64'
import { NextRequest } from 'next/server'

const BASE_URL = 'https://api.github.com/'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string; username: string } },
) {
  const { slug, username } = params

  try {
    const repositoryResponse = await fetch(
      `${BASE_URL}repos/${username}/${slug}`,
    )
    const readmeResponse = await fetch(
      `${BASE_URL}repos/${username}/${slug}/contents/README.md?ref=main`,
    )

    if (!repositoryResponse.ok || !readmeResponse.ok) return null

    const repository: FindRepositoryBySlugResponse =
      await repositoryResponse.json()
    const readme = await readmeResponse.json()

    const repositoryDetails = {
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

    return new Response(JSON.stringify(repositoryDetails))
  } catch (error: any) {
    console.error(error.message)
    return null
  }
}
