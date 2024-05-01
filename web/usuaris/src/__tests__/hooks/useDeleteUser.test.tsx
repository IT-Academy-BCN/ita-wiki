import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { act } from 'react-dom/test-utils'
import { Mock, vi } from 'vitest'
import { useDeleteUser } from '../../hooks'
import { queryClient } from '../setup'
import { server } from '../../__mocks__/server'

let mockDeleteUserMutation: Mock

beforeEach(() => {
  server.listen()
  mockDeleteUserMutation = vi.fn()

  vi.mock('../../hooks', () => ({
    useDeleteUser: () => ({
      deleteUserMutation: mockDeleteUserMutation,
    }),
  }))
})

afterEach(() => {
  server.resetHandlers()
  queryClient.clear()
  vi.clearAllMocks()
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
      expect(mockDeleteUserMutation).toHaveBeenCalledWith(mockUserId)
      expect(queryClient.getQueryData(['users'])).toBeUndefined()
    })
  })
})
