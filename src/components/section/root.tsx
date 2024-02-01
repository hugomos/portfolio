import React from 'react'

interface SectionRootProps {
  children: React.ReactNode | React.ReactNode[]
}

export const SectionRoot: React.FC<SectionRootProps> = ({ children }) => {
  return <section>{children}</section>
}
