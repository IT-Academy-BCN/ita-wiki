import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { registerUserFetcher } from '../helpers/fetchers'

export const useRegister = (handleRegisterModal: () => void) => {
  const [responseError, setResponseError] = useState('')
  const registerUser = useMutation(registerUserFetcher, {
    onMutate: () =>
      new Promise((resolve) => {
        setTimeout(resolve, 500)
      }),
    onSuccess: () => {
      setTimeout(handleRegisterModal, 2000)
    },
    onError: (error: Error) => {
      setResponseError(error.message)
    },
  })
  return {
    registerUser,
    responseError,
    setResponseError,
    isLoading: registerUser.isLoading,
    isSuccess: registerUser.isSuccess,
  }
}
