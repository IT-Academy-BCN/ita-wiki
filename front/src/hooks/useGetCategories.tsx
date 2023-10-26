import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../helpers'

export const useGetCategories = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
  })
  return { isLoading, error, data }
}
