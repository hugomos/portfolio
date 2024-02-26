import React from 'react'

interface SectionResumeProps {
  children: React.ReactNode
}

export const SectionResume: React.FC<SectionResumeProps> = ({ children }) => {
  return <p className="prose min-w-full dark:prose-invert">{children}</p>
}
