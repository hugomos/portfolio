import { Link } from '@/components/link'
import { Section } from '@/components/section'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>hey, I'm hugomos 👋</Section.Title>
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
      <Section.Content>
        <Section.Divider />
        <div className="flex items-center gap-2 w-full">
          <Link
            href="https://github.com/hugomos/"
            variant="icon"
            className="hover:underline"
          >
            <ArrowTopRightIcon />
            GitHub
          </Link>

          <Link
            href="https://linkedin.com/in/hugomos/"
            variant="icon"
            className="hover:underline"
          >
            <ArrowTopRightIcon />
            Linkedin
          </Link>

          <Link
            href="mailto:vitor_osantos@hotmail.com"
            variant="icon"
            className="hover:underline"
          >
            <ArrowTopRightIcon />
            Email
          </Link>
        </div>
      </Section.Content>
    </Section.Root>
  )
}

export default HomePage
