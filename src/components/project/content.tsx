import React from 'react'
import { CardContent } from '../ui/card'

interface ProjectContentProps {
  children: React.ReactNode | React.ReactNode[]
}

export const ProjectContent: React.FC<ProjectContentProps> = ({ children }) => {
  return (
    <CardContent className="prose prose-neutral dark:prose-invert pt-4">
      {children}
    </CardContent>
  )
}
