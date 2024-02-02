import React from 'react'

interface ExperienceHighlightsRootProps {
  children: React.ReactNode | React.ReactNode[]
}

export const ExperienceHighlightsRoot: React.FC<ExperienceHighlightsRootProps> = ({
  children,
}) => {
  return <ul>{children}</ul>
}
