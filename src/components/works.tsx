'use client'

import { Repository } from '@/app/api/repositories/route'
import React from 'react'
import useSWR from 'swr'
import { Work } from './work'

export const Works: React.FC = () => {
  const { data, isLoading } = useSWR(
    '/api/repositories',
    () =>
      fetch('https://www.hugomos.com/api/repositories?topics=portfolio').then(
        (res) => res.json(),
      ),
    {
      refreshInterval: 1000 * 60 * 10, // 10 minutes
    },
  )

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      {!data ? (
        <p>
          Looks like there's nothing here yet... Grab a coffee and come back
          later.
        </p>
      ) : (
        <div className="space-y-6">
          {data.map((work: Repository) => (
            <Work key={work.name} work={work} />
          ))}
        </div>
      )}
    </>
  )
}
