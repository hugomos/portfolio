import React from 'react'

interface ExperienceSubtitleProps {
  children: React.ReactNode
}

export const ExperienceSubtitle: React.FC<ExperienceSubtitleProps> = ({
  children,
}) => {
  return (
    <p className="text-neutral-600 dark:text-neutral-400 text-sm">{children}</p>
  )
}
