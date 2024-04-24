import { useQuery } from '@tanstack/react-query'
import { TFilters, type TUserData } from '../types'
import { getUsers } from '../helpers'
import { buildQueryString } from '../helpers/filters'

export const useGetUsers = (filters: TFilters = {}) => {
  const { isLoading, isError, data } = useQuery<TUserData[]>(
    ['users', buildQueryString(filters) || ''],
    () => getUsers(buildQueryString(filters) || '')
  )

  return { isLoading, isError, data }
}
