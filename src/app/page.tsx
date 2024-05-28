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
          I'm a software developer passionate about technology and very
          practical. I have experience in developing tools and process
          automations. I use{' '}
          <Link href="https://www.python.org/" variant="badge">
            Python
          </Link>
          ,{' '}
          <Link href="https://www.typescriptlang.org" variant="badge">
            Typescript
          </Link>
          ,{' '}
          <Link href="https://www.djangoproject.com" variant="badge">
            Django
          </Link>
          , and{' '}
          <Link href="https://nextjs.org" variant="badge">
            NextJS
          </Link>{' '}
          to create efficient solutions.
        </Section.Resume>
      </Section.Header>
      <Section.Content>
        <Section.Divider />
        <div className="flex items-center gap-2 w-full">
          <Link
            href="https://drive.google.com/file/d/1PfInJxAYsAzjn-c3bz6e0jOta0Z7D5u-/view?usp=sharing"
            variant="icon"
            className="hover:underline"
          >
            <ArrowTopRightIcon />
            Resume
          </Link>
          <Link href="/github" variant="icon" className="hover:underline">
            <ArrowTopRightIcon />
            GitHub
          </Link>

          <Link href="/linkedin" variant="icon" className="hover:underline">
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
