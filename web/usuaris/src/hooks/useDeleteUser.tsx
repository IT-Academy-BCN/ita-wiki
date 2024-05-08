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
  } = useMutation<void, Error, string>({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      if (successCb) successCb()
      queryClient.invalidateQueries(['users'])
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
  }
}