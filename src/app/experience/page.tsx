import { Experience } from '@/components/experience'
import { Section } from '@/components/section'
import React from 'react'

const ExperiencePage: React.FC = () => {
  return (
    <main className="flex-1">
      <Section.Root>
        <Section.Header>
          <Section.Title>professional experience</Section.Title>
        </Section.Header>
        <Section.Divider />
        <Section.Content>
          <Experience.Root>
            <Experience.Title>
              Athenas Consultoria Agrícola e Laboratórios
            </Experience.Title>
            <Experience.Subtitle>
              Software Developer, 2022 - Present
            </Experience.Subtitle>
            <Experience.Resume>
              I significantly contributed to the development of resources and
              important improvements for the company's internal processes,
              positively impacting dozens of clients. My achievements include:
            </Experience.Resume>
            <Experience.Highlights.Root>
              <Experience.Highlights.Item>
                Designing and developing a plugin for QGIS, allowing data
                visualization in graphs, creating sample collection tasks, and
                visualizing and generating routes for sending to the collection
                app.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                Collaborating on the planning and delivery of the current system
                used in the Consulting department.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                Developing and implementing functionalities for automatic update
                and upload of georeferenced geometries in the sample collection
                app.
              </Experience.Highlights.Item>
            </Experience.Highlights.Root>
          </Experience.Root>

          <Experience.Root>
            <Experience.Title>
              Athenas Consultoria Agrícola e Laboratórios
            </Experience.Title>
            <Experience.Subtitle>
              Software Developer, 2021 - 2022
            </Experience.Subtitle>
            <Experience.Resume>
              I had the opportunity to learn about the processes and challenges
              of the Consulting and IT departments, as well as deepen my
              knowledge in precision agriculture and soil chemical analysis. My
              achievements during this period include:
            </Experience.Resume>
            <Experience.Highlights.Root>
              <Experience.Highlights.Item>
                Developing a hub using Django, which centralizes technical
                documentation of the company's internal processes and scripts.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                Deepening my understanding of the Python language, technical
                documentation development, architectures, and design patterns.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                Working closely with the consulting and IT teams to improve
                process efficiency and service quality.
              </Experience.Highlights.Item>
            </Experience.Highlights.Root>
          </Experience.Root>
        </Section.Content>
      </Section.Root>
    </main>
  )
}

export default ExperiencePage
