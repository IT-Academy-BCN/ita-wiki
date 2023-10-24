import { useQuery } from '@tanstack/react-query'
import { getTopics, TGetTopics } from '../helpers/fetchers'

export const useGetTopics = (slug?: string) => {
  const { data, isLoading, isError, refetch } = useQuery<TGetTopics>({
    queryKey: ['getTopics', slug],
    queryFn: () => getTopics(slug),
  })

  const isSuccess = !isLoading && !isError && data !== undefined

  return { data, isLoading, isError, isSuccess, refetch }
}
