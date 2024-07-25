import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { act } from 'react-dom/test-utils'
import { setupServer } from 'msw/node'
import { useManageTopic } from '../../hooks'
import { queryClient } from '../setup'
import { handlers } from '../../__mocks__/handlers'

const server = setupServer(...handlers)
beforeEach(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  queryClient.clear()
})

afterAll(() => {
  server.close()
})

const slug = 'test-slug'

describe('useManageTopic hook', () => {
  it('should initialize the useManageTopic with default values', async () => {
    const { result } = renderHook(() => useManageTopic({ slug }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    await waitFor(() => {
      expect(result.current.errorMessage).toBe('')
      expect(result.current.rowStatus).toBe('available')
      expect(result.current.createTopic.isError).toBe(false)
      expect(result.current.createTopic.isSuccess).toBe(false)
      expect(result.current.updateTopic.isError).toBe(false)
      expect(result.current.updateTopic.isSuccess).toBe(false)
    })
  })

  it('should call fetchPostTopics on topic creation', async () => {
    const { result } = renderHook(() => useManageTopic({ slug }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    act(() => {
      result.current.createTopic.mutate({
        body: {
          name: 'test',
          categoryId: '1',
        },
      })
    })
    await waitFor(() => {
      expect(result.current.errorMessage).toBe('')
      expect(result.current.rowStatus).toBe('available')
      expect(result.current.createTopic.isError).toBe(false)
      expect(result.current.createTopic.isSuccess).toBe(true)
    })
  })

  it('should call fetchPatchTopics on topic update', async () => {
    const { result } = renderHook(() => useManageTopic({ slug }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    act(() => {
      result.current.updateTopic.mutate({
        body: {
          name: 'testUpdated',
          categoryId: '1',
          id: '1',
        },
      })
    })
    await waitFor(() => {
      expect(result.current.errorMessage).toBe('')
      expect(result.current.rowStatus).toBe('available')
      expect(result.current.updateTopic.isError).toBe(false)
      expect(result.current.updateTopic.isSuccess).toBe(true)
    })
  })
})
