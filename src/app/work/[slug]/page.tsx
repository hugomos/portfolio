'use client'

import { Section } from '@/components/section'
import { SectionContent } from '@/components/section/content'
import { Button } from '@/components/ui/button'
import { RepositoryDetails } from '@/utils/getUserRepositoryBySlug'
import { capitalize } from '@/utils/string/capitalize'
import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

interface WorkDetailsProps {
  params: {
    slug: string
  }
}

const WorkDetails: React.FC<WorkDetailsProps> = ({ params: { slug } }) => {
  const { data, isLoading } = useSWR<RepositoryDetails>(
    `/api/repositories/${slug}`,
    () => fetch(`/api/repositories/${slug}`).then((res) => res.json()),
  )

  if (!data && !isLoading) {
    return (
      <Section.Root>
        <Section.Header>
          <Section.Title>Repository not found</Section.Title>
        </Section.Header>
        <Section.Divider />
      </Section.Root>
    )
  }

  return (
    <Section.Root>
      {isLoading && <Section.Content>Loading...</Section.Content>}
      {data && (
        <>
          <Section.Header>
            <Section.Title>{capitalize(data.name)}</Section.Title>
            <Section.Resume>{data.description}</Section.Resume>
          </Section.Header>
          <Section.Divider />
          <SectionContent>
            <h2 className="text-xl font-semibold">Overview</h2>
            <div className="prose dark:prose-invert">
              <p>{`${capitalize(data.name)} was created on ${data.created_at} and was last updated on ${data.updated_at}. It currently has ${data.stargazers_count} stars in the Github repository.`}</p>
              <p>
                {`The language used in ${capitalize(data.name)} is ${capitalize(data.language)}, and its topics are ${data.topics.join(', ')}.`}
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6">
              <Link href={data.html_url} target="_blank" className="flex">
                <Button variant="outline" className="p-5">
                  <GitHubLogoIcon className="size-4 mr-2" />
                  View on GitHub
                </Button>
              </Link>
              {data.homepage && (
                <Link href={data.homepage} target="_blank" className="flex">
                  <Button className="p-5">
                    <ExternalLinkIcon className="size-4 mr-2" />
                    Visit Homepage
                  </Button>
                </Link>
              )}
            </div>
          </SectionContent>
        </>
      )}
    </Section.Root>
  )
}

export default WorkDetails
