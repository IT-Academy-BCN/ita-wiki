import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TUserData } from '../types'
import { deleteUser } from '../helpers/fetchers'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteUserMutation, isLoading } = useMutation<
    void,
    Error,
    string
  >(deleteUser, {
    onMutate: (id) => {
      queryClient.setQueryData<TUserData[]>(['users'], (prevData) =>
        prevData?.filter((user) => user.id !== id)
      )
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  return {
    deleteUserMutation,
    isLoading,
  }
}
