import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '../helpers/fetchers'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: deleteUserMutation,
    isLoading,
    isSuccess,
    isError,
  } = useMutation<void, Error, string>(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  return {
    deleteUserMutation,
    isLoading,
    isSuccess,
    isError,
  }
}
