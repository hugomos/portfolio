import React from 'react'
import { IWork, Work } from './work'


export const Works: React.FC = async () => {
  const works: IWork[] = []

  return (
    <>
      {works.length > 1 ? (
        <div className="grid grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-2">
          {works.map((work) => (
            <Work key={work.name} work={work} />
          ))}
        </div>
      ) : (
        <p>
          Looks like there's nothing here yet... Grab a coffee and come back
          later.
        </p>
      )}
    </>
  )
}
