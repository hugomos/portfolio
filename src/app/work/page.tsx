import { Section } from '@/components/section'
import { Works } from '@/components/works'

import React from 'react'

const WorkPage: React.FC = async () => {
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
        <Works />
      </Section.Content>
    </Section.Root>
  )
}

export default WorkPage
