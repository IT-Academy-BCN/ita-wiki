import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMultipleUsers } from '../helpers/fetchers'

type TUseDeleteMultipleUsers = {
  successCb?: () => void
  errorCb?: () => void
}

export const useDeleteMultipleUsers = (props?: TUseDeleteMultipleUsers) => {
  const { successCb, errorCb } = props || {}
  const queryClient = useQueryClient()

  const {
    mutate: deleteMultipleUsersMutation,
    isLoading,
    isSuccess,
    isError,
    reset,
  } = useMutation<void, Error, string[]>({
    mutationFn: (usersIds) => deleteMultipleUsers(usersIds),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      if (successCb) {
        setTimeout(() => {
          successCb()
        }, 2000)
        setTimeout(() => {
          reset()
        }, 2200)
      }
    },
    onError: () => {
      if (errorCb) errorCb()
    },
  })

  return {
    deleteMultipleUsersMutation,
    isLoading,
    isSuccess,
    isError,
    reset,
  }
}
