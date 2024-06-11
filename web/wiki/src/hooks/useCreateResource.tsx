import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { createResourceFetcher } from '../helpers/fetchers'
import { reloadPage } from '../utils/navigation'
import type { TResourceForm } from '../components/organisms/ResourceForm'

export const useCreateResource = () => {
  const [responseError, setResponseError] = useState('')
  const { reset } = useForm<TResourceForm>()
  const createResource = useMutation(createResourceFetcher, {
    onSuccess: () => {
      reset()
      reloadPage()
    },
    onError: (error: Error) => {
      setResponseError(error.message)
    },
  })

  return {
    createResource,
    responseError,
    isLoading: createResource.isLoading,
    isSuccess: createResource.isSuccess,
  }
}
