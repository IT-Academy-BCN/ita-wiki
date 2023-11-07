import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { createTopicFetcher, updateTopicFetcher } from '../helpers/fetchers'

type Refetch = () => void
export const useManageTopic = (refetch: Refetch) => {
  const [rowStatus, setRowStatus] = useState<string>('available')
  const [errorMessage, setErrorMessage] = useState<string>('')
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
