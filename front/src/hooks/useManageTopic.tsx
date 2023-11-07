import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { createTopicFetcher, updateTopicFetcher } from '../helpers/fetchers'
import { useGetTopics } from './useGetTopics'

export const useManageTopic = () => {
  const [rowStatus, setRowStatus] = useState<string>('available')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { refetch } = useGetTopics()
  const createTopic = useMutation({
    mutationFn: createTopicFetcher,
    onSuccess: async () => {
      refetch()
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })
  const updateTopic = useMutation({
    mutationFn: updateTopicFetcher,
    onSuccess: async () => {
      refetch()
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
