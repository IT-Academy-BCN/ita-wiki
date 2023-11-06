import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { createTopicFetcher, updateTopicFetcher } from '../helpers/fetchers'

export const useManageTopic = (refetch: () => void) => {
  const [rowStatus, setRowStatus] = useState<string>('available')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const createTopic = useMutation({
    mutationFn: createTopicFetcher,
    onSuccess: async () => {
      await refetch()
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
      await refetch()
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
