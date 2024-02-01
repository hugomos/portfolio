import { Link } from '@/components/link'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React from 'react'

const ProjectsPage: React.FC = () => {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>projects</Section.Title>
      </Section.Header>
      <Section.Divider />
      <Section.Content>
        <div className="grid grid-cols-1 space-y-6 md:px-6">
          <Card className="overflow-hidden space-y-6 md:flex-row">
            <CardHeader className="relative h-56 w-full">
              <Image
                src="/project3.png"
                alt=""
                layout="fill"
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="mt-0 mb-0">Project Name</CardTitle>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">
                    <Link href="https://www.python.org" variant="none">
                      Python
                    </Link>
                  </Badge>
                  <Badge variant="outline">
                    <Link
                      href="https://flask.palletsprojects.com/en/3.0.x/"
                      variant="none"
                    >
                      Flask
                    </Link>
                  </Badge>
                  <Badge variant="outline">
                    <Link href="https://www.sqlalchemy.org" variant="none">
                      SQLAlchemy
                    </Link>
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
                quod dolor iste delectus eveniet amet eos placeat ea ipsa,
                quibusdam quis quia consequuntur tempore pariatur aut hic
                doloremque non fugit.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center gap-3">
              <Button
                variant="default"
                className="w-full flex items-center gap-3"
              >
                View more
                <ExternalLinkIcon className="size-4" />
              </Button>
              <Button variant="outline" className="w-full">
                View Code
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section.Content>
    </Section.Root>
  )
}

export default ProjectsPage
