import { Repository } from '@/app/api/repositories/route'
import Link from 'next/link'
import React from 'react'

interface WorkProps {
  work: Repository
}

export const Work: React.FC<WorkProps> = ({ work }) => {
  const name = work.name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <Link
      href={work.html_url}
      target="_blank"
      className="block w-full space-y-5 p-4 rounded-md transition-colors bg-secondary hover:bg-secondary-foreground/10"
    >
      <div className="w-full flex items-center justify-between">
        <h3 className="font-bold">{name}</h3>
        <div className="flex items-center gap-2">
          {work.topics.map((topic) => (
            <div className="text-xs font-semibold rounded-sm px-1.5 py-0.5 bg-secondary-foreground/10 dark:bg-secondary-foreground/20 ">
              {topic}
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{work.description}</p>
    </Link>
  )
}
