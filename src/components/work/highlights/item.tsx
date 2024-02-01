import React from 'react'

interface WorkHighlightsItemProps {
  children: React.ReactNode
}

export const WorkHighlightsItem: React.FC<WorkHighlightsItemProps> = ({
  children,
}) => {
  return <li>{children}</li>
}
