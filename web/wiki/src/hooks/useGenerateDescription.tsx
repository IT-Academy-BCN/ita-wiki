import { useMutation } from '@tanstack/react-query'
import { generateDescriptionFetcher } from '../helpers/fetchers'

type TData = {
  generated_text: string
}[]

type TUseGenerateDescription = {
  onSuccess: (data: string) => void
}

export const useGenerateDescription = ({
  onSuccess,
}: TUseGenerateDescription) => {
  const mutation = useMutation(generateDescriptionFetcher, {
    onSuccess: (data: TData) => {
      const text = data?.[0]?.generated_text ?? ''
      onSuccess(text.replace(/^\n\n/, ''))
    },
  })

  return {
    ...mutation,
  }
}
