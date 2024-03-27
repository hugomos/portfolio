'use client'

import { ListRepositoriesByTopicsResponse } from '@/server/modules/repository/application/dto/list-repositories-by-topics'
import React from 'react'
import useSWR from 'swr'
import { Work } from './work'

export const Works: React.FC = () => {
  const { data, isLoading } = useSWR<ListRepositoriesByTopicsResponse[]>(
    '/api/hugomos/repositories/list-by-topics',
    () =>
      fetch('/api/hugomos/repositories/list-by-topics?topics=portfolio').then(
        (res) => res.json(),
      ),
    {
      refreshInterval: 1000 * 60 * 10, // 10 minutes
    },
  )

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      {!data ? (
        <p>
          Looks like there's nothing here yet... Grab a coffee and come back
          later.
        </p>
      ) : (
        <div className="space-y-6">
          {data.map((work) => (
            <Work key={work.name} work={work} />
          ))}
        </div>
      )}
    </>
  )
}
