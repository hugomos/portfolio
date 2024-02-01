import React from 'react'
import { CardTitle } from '../ui/card'

interface ProjectTitleProps {
  children: React.ReactNode
}

export const ProjectTitle: React.FC<ProjectTitleProps> = ({ children }) => {
  return <CardTitle className="mt-0 mb-0">{children}</CardTitle>
}
