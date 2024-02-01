import React from 'react'

interface WorkHighlightsRootProps {
  children: React.ReactNode | React.ReactNode[]
}

export const WorkHighlightsRoot: React.FC<WorkHighlightsRootProps> = ({
  children,
}) => {
  return <ul>{children}</ul>
}
