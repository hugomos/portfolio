import { Repository } from '@/app/api/repositories/route'
import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'

interface WorkProps {
  work: Repository
}

export const Work: React.FC<WorkProps> = ({ work }) => {
  return (
    <Link
      href={work.html_url}
      target="_blank"
      className="group w-full block p-4 space-y-4 bg-accent rounded-sm hover:bg-accent-foreground  transition-colors"
    >
      <div className="w-full flex justify-between items-center">
        <h3 className="font-bold text-lg text-primary group-hover:text-secondary">
          {work.name}
        </h3>
        <div className="flex items-center gap-2">
          {work.topics
            .filter((topic) => topic !== 'portfolio')
            .map((topic) => (
              <Badge key={topic} variant="default">
                {topic}
              </Badge>
            ))}
        </div>
      </div>
      <div className="text-muted-foreground text-sm">{work.description}</div>
    </Link>
  )
}
