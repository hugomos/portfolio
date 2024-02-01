import React from 'react'

interface WorkTitleProps {
  children: React.ReactNode
}

export const WorkTitle: React.FC<WorkTitleProps> = ({ children }) => {
  return (
    <h2 className="font-medium text-xl mb-1 tracking-tighter">{children}</h2>
  )
}
