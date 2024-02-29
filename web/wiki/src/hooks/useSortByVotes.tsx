import { useEffect, useState } from 'react'
import { TVoteCount, TSortOrder } from '../types'

export const useSortByVotes = <T extends { voteCount: TVoteCount }>(
  votes: T[] | undefined,
  sortOrderByVotes: TSortOrder = 'desc'
) => {
  const [sortedVotes, setSortedVotes] = useState<T[]>([])

  useEffect(() => {
    if (votes) {
      const sorted = [...votes].sort((a, b) => {
        const votesA = a.voteCount.total
        const votesB = b.voteCount.total

        if (sortOrderByVotes === 'asc') {
          return votesA - votesB
        }
        return votesB - votesA
      })

      setSortedVotes(sorted)
    }
  }, [votes, sortOrderByVotes])

  return { sortedVotes }
}
