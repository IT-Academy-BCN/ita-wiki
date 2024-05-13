import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '../helpers/fetchers'

type TUseDeleteUser = {
  successCb?: () => void
  errorCb?: () => void
}

export const useDeleteUser = (props?: TUseDeleteUser) => {
  const { successCb, errorCb } = props || {}
  const queryClient = useQueryClient()

  const {
    mutate: deleteUserMutation,
    isLoading,
    isSuccess,
    isError,
    reset,
  } = useMutation<void, Error, string>({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      if (successCb)
        setTimeout(() => {
          successCb()
          reset()
        }, 2000)
    },
    onError: () => {
      if (errorCb) errorCb()
    },
  })

  return {
    deleteUserMutation,
    isLoading,
    isSuccess,
    isError,
    reset,
  }
}
