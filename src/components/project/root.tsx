import React from 'react'
import { Card } from '../ui/card'

interface ProjectRootProps {
  children: React.ReactNode | React.ReactNode[]
}

export const ProjectRoot: React.FC<ProjectRootProps> = ({ children }) => {
  return (
    <Card className="overflow-hidden space-y-6 md:flex-row">{children}</Card>
  )
}
