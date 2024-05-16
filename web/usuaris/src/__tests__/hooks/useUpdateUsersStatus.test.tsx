import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { act } from 'react-dom/test-utils'
import { useUpdateUsersStatus } from '../../hooks'
import { queryClient } from '../setup'
import { server } from '../../__mocks__/server'
import { UserStatus } from '../../types'

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

describe('useUpdateUsersStatus hook', () => {
  it('should initialize the useUpdateUsersStatus hook', async () => {
    const { result } = renderHook(() => useUpdateUsersStatus(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    await waitFor(() => {
      expect(result.current.changeUsersStatus).toBeDefined()
      expect(result.current.error).toBe(null)
      expect(result.current.isSuccess).toBe(false)
    })
  })

  it('should call changeUsersStatus on users status update and refetch users on success', async () => {
    const { result } = renderHook(() => useUpdateUsersStatus(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')

    act(() => {
      result.current.changeUsersStatus.mutate({
        ids: ['1', '2', '5'],
        status: UserStatus.BLOCKED,
      })
    })
    await waitFor(() => {
      expect(result.current.error).toBe(null)
      expect(result.current.isSuccess).toBe(true)
      expect(invalidateQueriesSpy).toHaveBeenCalledWith(['users'])
    })
  })
})
