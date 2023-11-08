import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { loginUserFetcher } from '../helpers/fetchers'

export const useLogin = () => {
  const [responseError, setResponseError] = useState('')
  const loginUser = useMutation(loginUserFetcher, {
    onMutate: () =>
      new Promise((resolve) => {
        setTimeout(resolve, 500)
      }),
    onSuccess: () => {
      setTimeout(() => window.location.reload(), 2000)
    },
    onError: (error: Error) => {
      setResponseError(error.message)
    },
  })
  return {
    loginUser,
    responseError,
    isLoading: loginUser.isLoading,
    isSuccess: loginUser.isSuccess,
  }
}
