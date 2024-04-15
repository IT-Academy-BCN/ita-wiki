import { useQuery } from '@tanstack/react-query'
import { getItineraries } from '../helpers'

export const useGetItineraries = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['getItineraries'],
    queryFn: getItineraries,
  })
  return { isLoading, error, data }
}
