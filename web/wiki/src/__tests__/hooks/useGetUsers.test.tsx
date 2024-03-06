import { QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import { useGetUsers } from '../../hooks/useGetUsers'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetUsers', () => {
  beforeEach(() => {
    vi.mock('@tanstack/react-query', async () => {
      const actual: Record<number, unknown> = await vi.importActual(
        '@tanstack/react-query'
      )
      return {
        ...actual,
        useQuery: () => ({
          isLoading: false,
          isError: false,
          data: [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
          ],
        }),
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('fetches users successfully', async () => {
    const { result } = renderHook(() => useGetUsers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toEqual([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ])
  })
})
