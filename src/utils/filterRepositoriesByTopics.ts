import { Repository } from '@/app/api/repositories/route'

export const filterRepositoriesByTopics = (
  repositories: Repository[],
  topics: string[],
) => {
  return repositories
    .filter((repository) => {
      return topics.every((topic) => repository.topics.includes(topic))
    })
    .map((repository) => ({
      ...repository,
      topics: repository.topics.filter((topic) => topic !== 'portfolio'),
    }))
}
