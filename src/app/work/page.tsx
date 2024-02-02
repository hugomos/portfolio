import { Section } from '@/components/section'
import React from 'react'

const WorkPage: React.FC = () => {
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
        <div className="flex ">
          <p>&gt; Under construction, grab a coffee and come back later.</p>
        </div>
      </Section.Content>
    </Section.Root>
  )
}

export default WorkPage
