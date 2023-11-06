import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { createResourceFetcher } from '../helpers/fetchers'
import { reloadPage } from '../utils/navigation'
import type { TResourceForm } from '../components/organisms/ResourceForm'

export const useCreateResource = () => {
  const { reset } = useForm<TResourceForm>()
  const createResource = useMutation(createResourceFetcher, {
    onSuccess: () => {
      reset()
      reloadPage()
    },
  })

  return {
    createResource,
    isLoading: createResource.isLoading,
    isSuccess: createResource.isSuccess,
  }
}
