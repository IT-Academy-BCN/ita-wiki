import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUsersStatus } from '../helpers/fetchers'
import { TUpdatedUsersStatus } from '../types'

export const useUpdateUsersStatus = () => {
  const queryClient = useQueryClient()

  const changeUsersStatus = useMutation<null, Error, TUpdatedUsersStatus>(
    updateUsersStatus,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
      },
    }
  )
  return {
    changeUsersStatus,
    error: changeUsersStatus.error,
    isSuccess: changeUsersStatus.isSuccess,
  }
}
