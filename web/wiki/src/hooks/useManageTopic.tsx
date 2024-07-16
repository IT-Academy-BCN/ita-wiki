import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { TRowStatus } from '@itacademy/ui'
import {
  type ListTopicsResponse,
  usePatchTopics,
  usePostTopics,
} from '../openapi/openapiComponents'
import { queryKeyFn } from '../openapi/openapiContext'

export const useManageTopic = () => {
  const [rowStatus, setRowStatus] = useState<TRowStatus>('available')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const queryClient = useQueryClient()

  const { mutate: createTopic } = usePostTopics({
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFn({
          path: '/api/v1/topics',
          operationId: 'listTopics',
          variables: {
            headers: undefined,
            queryParams: undefined,
          },
        }),
      })
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
    onError: (error) => {
      setErrorMessage(error.payload as string)
    },
  })

  const { mutate: updateTopic } = usePatchTopics({
    onMutate: ({ body: { id: newId, name: newName } }) => {
      const queryCacheGetTopics = queryClient.getQueryCache().findAll(
        queryKeyFn({
          path: '/api/v1/topics',
          operationId: 'listTopics',
          variables: {
            headers: undefined,
            queryParams: undefined,
          },
        })
      )
      const queryKeys = queryCacheGetTopics.map((q) => q.queryKey)
      queryKeys.forEach((queryKey) => {
        queryClient.setQueryData<ListTopicsResponse>(queryKey, (prevData) => {
          if (prevData) {
            return prevData?.map((topic) =>
              topic.id === newId ? { ...topic, name: newName } : topic
            )
          }
          return prevData
        })
      })
    },
    onSuccess: async () => {
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
    onError: (error) => {
      setErrorMessage(error.payload as string)
    },
  })

  return {
    createTopic,
    updateTopic,
    errorMessage,
    rowStatus,
    setRowStatus,
    setErrorMessage,
  }
}
