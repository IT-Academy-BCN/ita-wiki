import { QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import { useGetTypes } from '../../hooks/useGetTypes'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetTypes', () => {
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
          data: ['Type 1', 'Type 2'],
        }),
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('fetches types successfully', async () => {
    const { result } = renderHook(() => useGetTypes(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toEqual(['Type 1', 'Type 2'])
  })
})
