import { useQuery } from '@tanstack/react-query'
import { getBanners } from '../helpers/fetchers'
import { TBanner } from '../types'

export const useGetBanners = () => {
  const { data, isLoading, isError, isSuccess } = useQuery<TBanner[]>({
    queryKey: ['getBanners'],
    queryFn: () => getBanners(),
  })
  return { isLoading, isError, isSuccess, data }
}
