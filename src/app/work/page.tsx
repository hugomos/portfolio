import { Section } from '@/components/section'
import { IWork, Work } from '@/components/work'

import React from 'react'

const WorkPage: React.FC = () => {
  const works: IWork[] = [
    // {
    //   id: '1',
    //   name: 'Placeholder',
    //   image: '/project1.png',
    //   description:
    //     'whenever picture tool joy village all shake nearest baby fifty swimming frighten aware establish surrounded',
    //   topics: ['python', 'django'],
    // },
    // {
    //   id: '2',
    //   name: 'Placeholder',
    //   image: '/project2.png',
    //   description:
    //     'instance action salmon sitting saved east butter guide tonight heading receive job tried hearing log per pitch ability roll path',
    //   topics: ['typescript', 'express'],
    // },
    // {
    //   id: '3',
    //   name: 'Placeholder',
    //   image: '/project3.png',
    //   description:
    //     'went hardly its modern wait sides friend blanket newspaper anyway event daily vegetable store for valley scientific pencil',
    //   topics: ['python', 'qgis'],
    // },
  ]

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
