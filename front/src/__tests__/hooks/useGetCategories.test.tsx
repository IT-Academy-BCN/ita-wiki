import { QueryClientProvider } from '@tanstack/react-query'
import { useGetCategories } from '../../hooks/useGetCategories'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetCategories', () => {
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
      { id: '1', name: 'React', slug: 'react' },
    ])
  })
})
