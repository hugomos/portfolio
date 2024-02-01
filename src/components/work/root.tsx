import React from 'react'

interface WorkRootProps {
  children: React.ReactNode | React.ReactNode[]
}

export const WorkRoot: React.FC<WorkRootProps> = ({ children }) => {
  return <div className="prose prose-neutral dark:prose-invert">{children}</div>
}
