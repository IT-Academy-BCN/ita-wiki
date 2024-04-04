import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { loginUserFetcher } from '../helpers/fetchers'

export const useLogin = () => {
  const { t } = useTranslation()
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
      setResponseError(t(error.message))
    },
  })

  return {
    loginUser,
    responseError,
    isLoading: loginUser.isLoading,
    isSuccess: loginUser.isSuccess,
  }
}
