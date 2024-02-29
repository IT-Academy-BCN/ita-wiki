import { useQuery } from '@tanstack/react-query'
import { TResource } from '../types'
import { getResourcesByUser } from '../helpers'
import { useAuth } from '../context/AuthProvider'

export const useGetResourcesByUser = (categorySlug?: string) => {
  const { user } = useAuth()
  const { isLoading, isError, data } = useQuery<TResource[]>({
    queryKey: ['getResourcesByUser', categorySlug],
    queryFn: () => getResourcesByUser(categorySlug),
    enabled: !!user,
  })
  return { isLoading, isError, data }
}
