import { QueryClientProvider } from '@tanstack/react-query'
import { useGetItineraries } from '../../hooks'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetItineraries', () => {
  it('fetches categories successfully', async () => {
    const { result } = renderHook(() => useGetItineraries(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toEqual([
      { id: '1', name: 'Frontend Angular', slug: 'frontend-angular' },
    ])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })
})
