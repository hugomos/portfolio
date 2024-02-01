import React from 'react'

interface StackRootProps {
  children: React.ReactNode | React.ReactNode[]
}

export const StackRoot: React.FC<StackRootProps> = ({ children }) => {
  return <div className="flex items-center gap-1">{children}</div>
}
