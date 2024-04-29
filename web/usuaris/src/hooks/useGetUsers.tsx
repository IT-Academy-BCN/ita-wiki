import { useQuery } from '@tanstack/react-query'
import { TFilters, type TUserData } from '../types'
import { buildQueryString, getUsers } from '../helpers'

export const useGetUsers = (filters: TFilters = {}) => {
  const { isLoading, isError, data } = useQuery<TUserData[]>(
    ['users', buildQueryString(filters) || ''],
    () => getUsers(buildQueryString(filters) || '')
  )
  console.log(data)

  return { isLoading, isError, data }
}
