import { useQuery } from '@tanstack/react-query'
import { getBanners } from '../helpers/fetchers'
import { TBannerData } from '../types'

export const useGetBanners = () => {
  const { data, isLoading, isError, isSuccess } = useQuery<TBannerData[]>({
    queryKey: ['getBanners'],
    queryFn: () => getBanners(),
  })
  return { isLoading, isError, isSuccess, data }
}
