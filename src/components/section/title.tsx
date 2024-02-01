import React from 'react'

interface SectionTitleProps {
  children: React.ReactNode
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <h1 className="font-medium text-2xl mb-8 tracking-tighter">{children}</h1>
  )
}
