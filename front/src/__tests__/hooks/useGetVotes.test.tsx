import { QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import { useGetVotes } from '../../hooks/useGetVotes'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetVotes', () => {
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
          data: {
            upvote: 3,
            downvote: 1,
            total: 2,
          },
          refetch: vi.fn(),
        }),
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('fetches votes successfully', async () => {
    const resourceId = 'resourceId' // Replace with a valid resource ID

    const { result } = renderHook(() => useGetVotes(resourceId), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.fetchedVotes).toBeTruthy())

    // Replace with the expected vote data for the provided resource ID
    expect(result.current.fetchedVotes).toEqual({
      upvote: 3,
      downvote: 1,
      total: 2,
    })
  })
})
