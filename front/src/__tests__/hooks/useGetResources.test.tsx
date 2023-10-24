import { QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import { useGetResources } from '../../hooks/useGetResources'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'
import { TFilters } from '../../types'

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
          {
            id: 'resourceId',
            title: 'Resource title',
            slug: 'react',
            description: 'Resource description',
            url: 'https://tutorials.cat/learn/javascript',
            resourceType: 'VIDEO',
            userId: 'userId',
            createdAt: '11/11/2011',
            updatedAt: '12/12/2012',
            status: 'NOT_SEEN',
            voteCount: {
              upvote: 3,
              downvote: 0,
              total: 3,
            },
          },
        ],
      }),
    }
  })
})
afterEach(() => {
  vi.resetAllMocks()
})

describe('useGetResources', () => {
  it('gets an array resources ', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetResources(), { wrapper })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toHaveLength(1)
  })
  it('handles filters correctly', async () => {
    const filters: TFilters = {
      slug: 'example-slug',
      resourceTypes: ['type1', 'type2'],
      status: ['published'],
      topic: 'example-topic',
    }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetResources(filters), {
      wrapper,
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())
  })
})
