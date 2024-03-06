import { useQuery } from '@tanstack/react-query'
import { TGetTypes, TError } from '../types/types'
import { getTypes } from '../helpers/fetchers'

export const useGetTypes = () => {
  const { isLoading, error, data } = useQuery<TGetTypes, TError>({
    queryKey: ['types'],
    queryFn: getTypes,
  })

  return { isLoading, error, data }
}
