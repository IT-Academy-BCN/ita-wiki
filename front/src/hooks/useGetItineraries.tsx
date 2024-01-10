import { useQuery } from '@tanstack/react-query'
import { getItineraries } from '../helpers'
import { TItinerary } from '../types'

export const useGetItineraries = () => {
  const { isLoading, error, data } = useQuery<boolean, Error, TItinerary[]>({
    queryKey: ['getItineraries'],
    queryFn: getItineraries,
  })

  return { isLoading, error, data }
}
