import { Section } from '@/components/section'
import { IWork, Work } from '@/components/work'

import React from 'react'

async function getData(): Promise<IWork[]> {
  const res = await fetch(
    'https://www.hugomos.com/api/repositories?username=hugomos&topics=portfolio',
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return await res.json()
}

const WorkPage: React.FC = async () => {
  const works: IWork[] = await getData()

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>my work</Section.Title>
        <Section.Resume>
          On a mission to build products developers love, and, along the way,
          write another page in the history of technology and development.
          Here's a summary of my work so far.
        </Section.Resume>
      </Section.Header>
      <Section.Divider />
      <Section.Content>
        {works.length > 1 ? (
          <div className="grid grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-2">
            {works.map((work) => (
              <Work key={work.name} work={work} />
            ))}
          </div>
        ) : (
          <p>
            Looks like there's nothing here yet... Grab a coffee and come back
            later.
          </p>
        )}
      </Section.Content>
    </Section.Root>
  )
}

export default WorkPage
