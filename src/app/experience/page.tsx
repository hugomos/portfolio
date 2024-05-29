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
              I made significant contributions to the development of resources
              and important improvements for the company's internal processes,
              positively impacting dozens of clients. My achievements include:
            </Experience.Resume>
            <Experience.Highlights.Root>
              <Experience.Highlights.Item>
                Planning and developing a QGIS plugin focused on optimizing
                essential processes for soil sample collection and statistical
                data analysis for the Consulting sector. This involved
                integrating tools for data visualization in graphs, creating
                sample collection tasks, and generating routes for submission to
                the collection application.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                Identifying and fixing critical bugs in the production
                environment, ensuring the stability and reliability of the
                applications
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                Thoroughly crafting technical documentation covering processes,
                scripts, and developed applications, making it easier for the
                team to understand and maintain.
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
              of both consulting and IT sectors, while also deepening my
              knowledge in precision agriculture and soil chemical analysis. My
              achievements during this period include:
            </Experience.Resume>
            <Experience.Highlights.Root>
              <Experience.Highlights.Item>
                Developing a hub using Django, which centralizes technical
                documentation of the company's internal processes and scripts,
                enabling easy access and knowledge sharing among teams.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                Gaining a profound understanding of the Python language,
                resulting in the ability to develop detailed technical
                documentation, architectures, and design patterns for internal
                applications and systems.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                Collaborating closely with consulting and IT teams to enhance
                process efficiency and service quality, by identifying
                optimization opportunities and implementing effective solutions.
              </Experience.Highlights.Item>
            </Experience.Highlights.Root>
          </Experience.Root>
        </Section.Content>
      </Section.Root>
    </main>
  )
}

export default ExperiencePage
