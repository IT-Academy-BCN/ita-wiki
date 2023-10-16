import { vi } from 'vitest'
import { QueryClientProvider } from '@tanstack/react-query'
import { TAuthContext, useAuth, AuthProvider } from '../../context/AuthProvider'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'
import { useGetFavorites } from '../../hooks'

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      '../../context/AuthProvider'
    )
    return {
      ...actual,
      useAuth: vi.fn(),
    }
  })
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
            id: 'favoriteId',
            title: 'My favorite title',
            slug: 'my-favorite',
            description: 'Favorite description',
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

describe('useGetFavorites', () => {
  it("gets an array of user's favorite resources when user is logged in", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        avatar: 'TestAvatar',
      },
    } as TAuthContext)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    )
    const { result } = renderHook(() => useGetFavorites(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toHaveLength(1)
  })
})
