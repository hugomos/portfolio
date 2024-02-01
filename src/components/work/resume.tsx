import React from 'react'

interface WorkResumeProps {
  children: React.ReactNode
}

export const WorkResume: React.FC<WorkResumeProps> = ({ children }) => {
  return <p>{children}</p>
}
