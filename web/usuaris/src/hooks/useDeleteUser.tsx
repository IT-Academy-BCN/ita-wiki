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
      setTimeout(() => {
        if (successCb) successCb()
        reset()
      }, 3000)
    },
    onError: () => {
      setTimeout(() => {
        if (errorCb) errorCb()
        reset()
      }, 3000)
    },
  })

  return {
    deleteUserMutation,
    isLoading,
    isSuccess,
    isError,
  }
}
