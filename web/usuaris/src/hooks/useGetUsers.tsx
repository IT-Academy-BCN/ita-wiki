import { useQuery } from '@tanstack/react-query'
import { type TUserData } from '../types'
import { getUsers } from '../helpers'

export const useGetUsers = () => {
  const { isLoading, isError, data } = useQuery<TUserData[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  })
  return { isLoading, isError, data }
}
