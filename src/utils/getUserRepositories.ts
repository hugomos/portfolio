import { Repository } from '@/app/api/repositories/route'

export const getUserRepositories = async (username: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
    )

    if (!response.ok) return null

    const repositories: Repository[] = await response.json()

    return repositories
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        description: repository.description,
        topics: repository.topics,
        html_url: repository.html_url,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message)
    return null
  }
}
