import React from 'react'

interface SectionHeaderProps {
  children: React.ReactNode | React.ReactNode[]
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => {
  return <div>{children}</div>
}
