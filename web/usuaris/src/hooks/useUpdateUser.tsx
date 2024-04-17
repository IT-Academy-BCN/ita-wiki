import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchUser } from '../helpers/fetchers'
import { TUserData, TUpdatedUser } from '../types'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  const changeUserStatus = useMutation<null, Error, TUpdatedUser>(patchUser, {
    onMutate: (updatedUser) => {
      queryClient.setQueryData<TUserData[]>(['users'], (prevData) => {
        if (prevData) {
          return prevData.map((user) =>
            user.id === updatedUser.id && updatedUser.status
              ? {
                  ...user,
                  status: updatedUser.status,
                }
              : user
          )
        }
        return prevData
      })
    },
  })
  return {
    changeUserStatus,
    error: changeUserStatus.error,
    isSuccess: changeUserStatus.isSuccess,
  }
}
