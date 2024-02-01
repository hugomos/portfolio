import React from 'react'

interface WorkSubtitleProps {
  children: React.ReactNode
}

export const WorkSubtitle: React.FC<WorkSubtitleProps> = ({ children }) => {
  return (
    <p className="text-neutral-600 dark:text-neutral-400 text-sm">{children}</p>
  )
}
