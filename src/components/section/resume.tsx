import React from 'react'

interface SectionResumeProps {
  children: React.ReactNode
}

export const SectionResume: React.FC<SectionResumeProps> = ({ children }) => {
  return <p className="prose prose-neutral dark:prose-invert">{children}</p>
}
