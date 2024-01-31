import React from 'react'

interface ContainerProps {
  children: React.ReactNode | React.ReactNode[]
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
      {children}
    </div>
  )
}
