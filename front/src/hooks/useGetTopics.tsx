import { useQuery } from '@tanstack/react-query'
import { getTopics } from '../helpers/fetchers'
import { TGetTopics } from '../types'

export const useGetTopics = (slug?: string) => {
  const { data, isLoading, isError, refetch } = useQuery<TGetTopics>({
    queryKey: ['getTopics', slug],
    queryFn: () => getTopics(slug),
  })

  const isSuccess = !isLoading && !isError && data !== undefined

  return { data, isLoading, isError, isSuccess, refetch }
}
