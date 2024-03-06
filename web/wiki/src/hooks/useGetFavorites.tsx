import { useQuery } from '@tanstack/react-query'
import { getFavorites } from '../helpers/fetchers'
import { useAuth } from '../context/AuthProvider'
import { TFavorites } from '../types'

export const useGetFavorites = (slug?: string) => {
  const { user } = useAuth()
  const { isLoading, isError, data } = useQuery<TFavorites[]>({
    queryKey: ['getFavorites', slug],
    queryFn: () => getFavorites(slug),
    enabled: !!user, // Enable the query only if there is a logged-in user
  })

  const isSuccess = !isLoading && !isError && data !== undefined

  return { isLoading, isError, data, isSuccess }
}
