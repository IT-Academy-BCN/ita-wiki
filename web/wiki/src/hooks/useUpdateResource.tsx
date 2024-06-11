import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { updateResourceFetcher } from '../helpers/fetchers'
import { reloadPage } from '../utils/navigation'
import type { TResourceForm } from '../components/organisms/ResourceForm'

export const useUpdateResource = () => {
  const [responseError, setResponseError] = useState('')
  const { reset } = useForm<TResourceForm>()
  const updateResource = useMutation(updateResourceFetcher, {
    onSuccess: () => {
      reset()
      reloadPage()
    },
    onError: (error: Error) => {
      setResponseError(error.message)
    },
  })

  return {
    updateResource,
    responseError,
    isLoading: updateResource.isLoading,
    isSuccess: updateResource.isSuccess,
  }
}
