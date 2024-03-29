import { Experience } from '@/components/experience'
import { Section } from '@/components/section'
import Link from 'next/link'
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
              Software Developer, 2021 - Present
            </Experience.Subtitle>
            <Experience.Resume>
              I joined Athenas early as part of the{' '}
              <Link href="https://www.sp.senac.br/jovem-aprendiz-empresa">
                Young Apprentice program at Senac São Paulo
              </Link>
              . I worked for about a year on the agricultural consulting team
              and later transferred to the development team. I created scripts,
              developed plugins, and tools for automating processes from the
              office to the field.
            </Experience.Resume>
            <Experience.Highlights.Root>
              <Experience.Highlights.Item>
                In 2021, within the consulting team, I gained insights into the
                significance of georeferenced points in precision agriculture.
                Using GPS, we marked points to collect data, such as soil
                samples. This data guides decisions regarding inputs and
                irrigation. Sending samples to the laboratory, based on these
                points, generates personalized recommendations, optimizing
                agricultural production and promoting sustainability.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                In 2022, already integrated into the development team, I
                contributed to the development of automation scripts using the
                Python language. I wrote technical documentation on the
                processes and scripts, and I developed a website with Next.js
                and TypeScript to make the documentation available.
              </Experience.Highlights.Item>
              <Experience.Highlights.Item>
                In 2023, I actively participated in decision-making related to
                the software developed by the team. I created tools and improved
                existing scripts. I also took part in the process of rewriting
                legacy code and in the development of a unified process
                management system.
              </Experience.Highlights.Item>
            </Experience.Highlights.Root>
          </Experience.Root>
        </Section.Content>
      </Section.Root>
    </main>
  )
}

export default ExperiencePage
