import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { act } from 'react-dom/test-utils'
import { useDeleteMultipleUsers } from '../../hooks'
import { queryClient } from '../setup'
import { server } from '../../__mocks__/server'

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

describe('useDeleteMultipleUsers hook', () => {
  it('should initialize the useDeleteMultipleUsers hook', async () => {
    const { result } = renderHook(() => useDeleteMultipleUsers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => {
      expect(result.current.deleteMultipleUsersMutation).toBeDefined()
      expect(result.current.isError).toBe(false)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isSuccess).toBe(false)
    })
  })

  it('should delete users successfully and invalidate queries', async () => {
    const { result } = renderHook(() => useDeleteMultipleUsers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    const mockUsersIds = ['1', '3', '4']

    act(() => {
      result.current.deleteMultipleUsersMutation(mockUsersIds)
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.isError).toBe(false)
      expect(result.current.isLoading).toBe(false)
      expect(queryClient.getQueryData(['users'])).toBeUndefined()
    })
  })
})
