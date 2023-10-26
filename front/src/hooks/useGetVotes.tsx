import { useQuery } from '@tanstack/react-query'
import { getVotes } from '../helpers/fetchers'
import { TVoteCountResponse } from '../types/types'

export const useGetVotes = (resourceId: string) => {
  const { data: fetchedVotes, refetch } = useQuery<TVoteCountResponse>({
    queryKey: ['votes', resourceId],
    queryFn: () => getVotes(resourceId),
    onError: () => {
      // eslint-disable-next-line no-console
      console.error('Error fetching votes')
    },
  })
  return { fetchedVotes, refetch }
}
