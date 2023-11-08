import { useEffect, useState } from 'react'
import { TVoteCount } from '../types'

type SortOrderByVotes = 'desc' | 'asc'

export const useSortByVotes = <T extends { voteCount: TVoteCount }>(
  votes: T[] | undefined,
  sortOrderByVotes: SortOrderByVotes = 'desc'
) => {
  const [sortedVotes, setSortedVotes] = useState<T[]>([])

  useEffect(() => {
    if (votes) {
      const sorted = [...votes].sort((a, b) => {
        const votesA = a.voteCount.total
        const votesB = b.voteCount.total

        if (sortOrderByVotes === 'desc') {
          return votesA - votesB
        }
        return votesB - votesA
      });

      setSortedVotes(sorted)
    }
  }, [votes, sortOrderByVotes])

  return { sortedVotes }
}
