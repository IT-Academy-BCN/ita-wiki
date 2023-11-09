import { useQuery } from '@tanstack/react-query'
import { TUser } from '../types'
import { getUsers } from '../helpers'

export const useGetUsers = () => {
  const { isLoading, isError, data } = useQuery<TUser[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  })
  return { isLoading, isError, data }
}
