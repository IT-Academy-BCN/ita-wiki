import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchUserStatus } from '../helpers/fetchers'
import { TUserData, TUserUpdatedStatus } from '../types'

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient()

  const changeUserStatus = useMutation<null, Error, TUserUpdatedStatus>(
    patchUserStatus,
    {
      onMutate: (updatedUser) => {
        queryClient.setQueryData<TUserData[]>(['users'], (prevData) => {
          if (prevData) {
            return prevData.map((u) =>
              u.id === updatedUser.id
                ? {
                    ...u,
                    status: updatedUser.status,
                  }
                : u
            )
          }
          return prevData
        })
      },
    }
  )
  return {
    changeUserStatus,
    error: changeUserStatus.error,
    isSuccess: changeUserStatus.isSuccess,
  }
}
