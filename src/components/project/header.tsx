import React from 'react'

interface ProjectHeaderProps {
  children: React.ReactNode | React.ReactNode[]
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ children }) => {
  return <div className="flex items-center justify-between">{children}</div>
}
