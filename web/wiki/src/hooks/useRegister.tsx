import { useMutation } from '@tanstack/react-query'
import { registerUserFetcher } from '../helpers/fetchers'
import { type TRegisterForm } from '../types'

export const useRegister = (handleRegisterModal: () => void) => {
  const registerUser = useMutation<null, Error, TRegisterForm>(
    registerUserFetcher,
    {
      onMutate: () =>
        new Promise((resolve) => {
          setTimeout(resolve, 500)
        }),
      onSuccess: () => {
        setTimeout(handleRegisterModal, 2000)
      },
    }
  )
  return {
    registerUser,
    error: registerUser.error,
    isLoading: registerUser.isLoading,
    isSuccess: registerUser.isSuccess,
  }
}
