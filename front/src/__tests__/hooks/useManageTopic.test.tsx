// import { renderHook, waitFor } from '@testing-library/react'
// import { QueryClientProvider } from '@tanstack/react-query'
// import { vi } from 'vitest'
// import { act } from 'react-dom/test-utils'
// import { useManageTopic } from '../../hooks'
// import { queryClient } from '../setup'

describe('useManageTopic hook', () => {
  /* it('should initialize the useManageTopic with default values', async () => {
    const { result } = renderHook(() => useManageTopic(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current.createTopic).toBeDefined()
    expect(result.current.updateTopic).toBeDefined()
    expect(result.current.rowStatus).toBe('available')
    expect(result.current.errorMessage).toBe('')
    expect(result.current.setRowStatus).toBeDefined()
    expect(result.current.setErrorMessage).toBeDefined()
  })

  it('should call createTopicFetcher on topic creation', async () => {
    const { result } = renderHook(() => useManageTopic(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    act(() => {
      result.current.createTopic.mutate({
        name: 'test',
        categoryId: '1',
      })
    })
    await waitFor(() => {
      expect(result.current.createTopic).toBeTruthy()
      expect(result.current.rowStatus).toBe('available')
      expect(result.current.errorMessage).toBe('')
    })
  })

  it('should call updateTopicFetcher on topic update', async () => {
    const { result } = renderHook(() => useManageTopic(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    act(() => {
      result.current.updateTopic.mutate({
        name: 'testUpdated',
        categoryId: '1',
        id: 'topicId',
      })
    })

    await waitFor(() => {
      expect(result.current.updateTopic).toBeTruthy()
      expect(result.current.rowStatus).toBe('available')
      expect(result.current.errorMessage).toBe('')
    })
  }) */
})
