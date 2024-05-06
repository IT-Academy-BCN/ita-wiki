import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { act } from 'react-dom/test-utils'
import { useDeleteUser } from '../../hooks'
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

describe('useDeleteUser hook', () => {
  it('should initialize the useDeleteUser hook', async () => {
    const { result } = renderHook(() => useDeleteUser(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => {
      expect(result.current.deleteUserMutation).toBeDefined()
      expect(result.current.isError).toBe(false)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isSuccess).toBe(false)
    })
  })

  it('should delete user successfully and invalidate queries', async () => {
    const { result } = renderHook(() => useDeleteUser(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    const mockUserId = '1'

    act(() => {
      result.current.deleteUserMutation(mockUserId)
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.isError).toBe(false)
      expect(result.current.isLoading).toBe(false)
      expect(queryClient.getQueryData(['users'])).toBeUndefined()
    })
  })
})
