import { QueryClientProvider } from '@tanstack/react-query'
import { useGetItineraries } from '../../hooks/useGetItineraries'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetItineraries', () => {
  it.only('fetches itineraries successfully', async () => {
    const { result } = renderHook(() => useGetItineraries(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toEqual([
      { id: '1', name: 'Frontend React', slug: 'react' },
    ])
  })
})
