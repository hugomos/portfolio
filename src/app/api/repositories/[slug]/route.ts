import { getUserRepositoryBySlug } from '@/utils/getUserRepositoryBySlug'
import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = params
  const repository = await getUserRepositoryBySlug('hugomos', slug)

  if (!repository) {
    return new Response(JSON.stringify({}), {
      status: 500,
      statusText: 'Failed to fetch repository',
    })
  }

  return new Response(JSON.stringify(repository))
}
