import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { act } from 'react-dom/test-utils'
import { setupServer } from 'msw/node'
import { useUpdateUser } from '../../hooks'
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

describe('useUpdateUser hook', () => {
  it('should initialize the useUpdateUser with default values', async () => {
    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    await waitFor(() => {
      expect(result.current.changeUserStatus).toBeDefined()
      expect(result.current.error).toBe(null)
      expect(result.current.isSuccess).toBe(false)
    })
  })

  it('should call changeUserStatus on user status update', async () => {
    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    act(() => {
      result.current.changeUserStatus.mutate({
        id: '1',
        status: 'BLOCKED',
      })
    })
    await waitFor(() => {
      expect(result.current.error).toBe(null)
      expect(result.current.isSuccess).toBe(true)
    })
  })
})
