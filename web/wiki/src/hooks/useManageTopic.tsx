import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TRowStatus } from '@itacademy/ui'
import {
  fetchPatchTopics,
  fetchPostTopics,
  PatchTopicsError,
  PostTopicsError,
  type ListTopicsQueryParams,
  type ListTopicsResponse,
} from '../openapi/openapiComponents'
import { queryKeyFn } from '../openapi/openapiContext'
import { type TTopic } from '../types'

export const useManageTopic = ({ slug }: ListTopicsQueryParams) => {
  const [rowStatus, setRowStatus] = useState<TRowStatus>('available')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const queryClient = useQueryClient()

  const queryKeyTopics = queryKeyFn({
    path: '/api/v1/topics',
    operationId: 'listTopics',
    variables: {
      headers: undefined,
      queryParams: { slug },
    },
  })

  const createTopic = useMutation({
    mutationFn: fetchPostTopics,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyTopics,
      })
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
    onError: (error: PostTopicsError) => {
      setErrorMessage(error.payload as string)
    },
  })

  const updateTopic = useMutation({
    mutationFn: fetchPatchTopics,
    onMutate: ({ body: { id, name: newName } }) => {
      const queryCacheGetTopics = queryClient
        .getQueryCache()
        .findAll(queryKeyTopics)

      const queryKeys = queryCacheGetTopics.map((q) => q.queryKey)
      queryKeys.forEach((queryKey) => {
        queryClient.setQueryData<ListTopicsResponse>(queryKey, (prevData) => {
          if (prevData && newName) {
            return prevData?.map((topic: TTopic) =>
              topic.id === id ? { ...topic, name: newName } : topic
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
    onError: (error: PatchTopicsError) => {
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
