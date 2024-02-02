import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'

export interface IWork {
  id: string
  name: string
  image: string
  description: string
  topics: string[]
}

interface WorkProps {
  work: IWork
}

export const Work: React.FC<WorkProps> = ({ work }) => {
  return (
    <div className="relative group overflow-hidden rounded-md md:w-80">
      <Link href="#">
        <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity group-hover:opacity-100"></div>
        <img
          src={work.image}
          alt={work.name}
          className="w-full h-52 object-cover transition-opacity group-hover:opacity-25 md:w-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-8 text-white">
            <h2 className="text-xl font-bold mb-2">{work.name}</h2>
            <p className="text-xs mb-4 w-3/4 md:w-full">{work.description}</p>
            <div className="flex justify-start gap-2">
              {work.topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
