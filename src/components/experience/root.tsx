import React from 'react'

interface ExperienceRootProps {
  children: React.ReactNode | React.ReactNode[]
}

export const ExperienceRoot: React.FC<ExperienceRootProps> = ({ children }) => {
  return <div className="prose prose-neutral dark:prose-invert">{children}</div>
}
