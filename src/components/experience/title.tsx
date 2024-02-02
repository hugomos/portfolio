import React from 'react'

interface ExperienceTitleProps {
  children: React.ReactNode
}

export const ExperienceTitle: React.FC<ExperienceTitleProps> = ({
  children,
}) => {
  return (
    <h2 className="font-medium text-xl mb-1 tracking-tighter">{children}</h2>
  )
}
