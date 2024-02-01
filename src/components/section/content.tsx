import React from 'react'

interface SectionContentProps {
  children: React.ReactNode | React.ReactNode[]
}

export const SectionContent: React.FC<SectionContentProps> = ({ children }) => {
  return <div className="space-y-6">{children}</div>
}
