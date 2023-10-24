import { QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import { useGetCategories } from '../../hooks/useGetCategories'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetCategories', () => {
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
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
          ],
        }),
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('fetches categories successfully', async () => {
    const { result } = renderHook(() => useGetCategories(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toEqual([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ])
  })
})
