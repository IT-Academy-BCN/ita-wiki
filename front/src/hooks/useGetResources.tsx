import { useQuery } from '@tanstack/react-query'
import { TFilters, TResource } from '../types'
import { getResources } from '../helpers/fetchers'
import { buildQueryString } from '../helpers'

export const useGetResources = (filters: TFilters = {}) => {
  const { isLoading, error, data } = useQuery<TResource[]>(
    ['getResources', buildQueryString(filters) || ''],
    () => getResources(buildQueryString(filters) || '')
  )

  return { isLoading, error, data }
}
