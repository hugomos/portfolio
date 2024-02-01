import { Link } from '@/components/link'
import { Section } from '@/components/section'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Hi, I'm hugomos 👋</Section.Title>
        <Section.Resume>
          I am a software developer, technology enthusiast, and very practical.
          Currently, I work in the development team at{' '}
          <Link href="https://athenasagricola.com.br">
            Athenas Consultoria Agrícola e Laboratórios
          </Link>
          , where I build tools and plugins focused on precision agriculture. I
          use{' '}
          <Link href="https://www.python.org/" variant="badge">
            Python
          </Link>
          ,{' '}
          <Link href="https://www.typescriptlang.org" variant="badge">
            Typescript
          </Link>
          ,{' '}
          <Link href="https://qgis.org/pt_BR/site/" variant="badge">
            QGIS
          </Link>
          , and{' '}
          <Link
            href="https://www.esri.com/pt-br/arcgis/about-arcgis/overview"
            variant="badge"
          >
            ArcGIS
          </Link>{' '}
          in the development of these solutions.
        </Section.Resume>
      </Section.Header>
    </Section.Root>
  )
}

export default HomePage
