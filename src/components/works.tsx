import React from 'react'
import { IWork, Work } from './work'

async function getData(): Promise<IWork[]> {
  const res = await fetch(
    'https://www.hugomos.com/api/repositories?username=hugomos&topics=portfolio',
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return await res.json()
}

export const Works: React.FC = async () => {
  const works: IWork[] = await getData()

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
