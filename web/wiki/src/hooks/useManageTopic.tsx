import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TRowStatus } from '@itacademy/ui'
import { createTopicFetcher, updateTopicFetcher } from '../helpers/fetchers'
import { TGetTopics } from '../types'

export const useManageTopic = () => {
  const [rowStatus, setRowStatus] = useState<TRowStatus>('available')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const queryClient = useQueryClient()

  const createTopic = useMutation({
    mutationFn: createTopicFetcher,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['getTopics'],
      })
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })
  const updateTopic = useMutation({
    mutationFn: updateTopicFetcher,
    onMutate: (updatedTopic) => {
      const queryCacheGetTopics = queryClient
        .getQueryCache()
        .findAll(['getTopics'])
      const queryKeys = queryCacheGetTopics.map((q) => q.queryKey)
      queryKeys.forEach((queryKey) => {
        queryClient.setQueryData<TGetTopics>(queryKey, (prevData) => {
          if (prevData) {
            return prevData?.map((topic) =>
              topic.id === updatedTopic.id
                ? { ...topic, name: updatedTopic.name }
                : topic
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
    onError: (error: Error) => {
      setErrorMessage(error.message)
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
