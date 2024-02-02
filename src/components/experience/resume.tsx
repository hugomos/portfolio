import React from 'react'

interface ExperienceResumeProps {
  children: React.ReactNode
}

export const ExperienceResume: React.FC<ExperienceResumeProps> = ({
  children,
}) => {
  return <p>{children}</p>
}
