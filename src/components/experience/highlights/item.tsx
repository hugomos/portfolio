import React from 'react'

interface ExperienceHighlightsItemProps {
  children: React.ReactNode
}

export const ExperienceHighlightsItem: React.FC<
  ExperienceHighlightsItemProps
> = ({ children }) => {
  return <li>{children}</li>
}
