import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { updateResourceFetcher } from '../helpers/fetchers'
import { reloadPage } from '../utils/navigation'
import type { TResourceForm } from '../components/organisms/ResourceForm'

export const useUpdateResource = () => {
  const { reset } = useForm<TResourceForm>()
  const updateResource = useMutation(updateResourceFetcher, {
    onSuccess: () => {
      reset()
      reloadPage()
    },
  })

  return {
    updateResource,
    isLoading: updateResource.isLoading,
    isSuccess: updateResource.isSuccess,
  }
}
