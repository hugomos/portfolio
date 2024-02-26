import React from 'react'

interface ExperienceRootProps {
  children: React.ReactNode | React.ReactNode[]
}

export const ExperienceRoot: React.FC<ExperienceRootProps> = ({ children }) => {
  return <div className="prose min-w-full dark:prose-invert">{children}</div>
}
