import { Section } from '@/components/section'
import { Work } from '@/components/work'

import React from 'react'

const WorkPage: React.FC = async () => {
  const response = await fetch(
    'https://hugomos.com/api/repositories?username=hugomos&topics=portfolio',
  )

  const works = await response.json()

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
