import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchUser } from '../helpers/fetchers'
import { TUpdatedUser } from '../types'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  const changeUserStatus = useMutation<null, Error, TUpdatedUser>(patchUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
  return {
    changeUserStatus,
    error: changeUserStatus.error,
    isSuccess: changeUserStatus.isSuccess,
  }
}
