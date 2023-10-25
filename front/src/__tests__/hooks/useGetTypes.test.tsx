import { QueryClientProvider } from '@tanstack/react-query'
import { useGetTypes } from '../../hooks/useGetTypes'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetTypes', () => {
  it('fetches types successfully', async () => {
    const { result } = renderHook(() => useGetTypes(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toEqual([
      'Test type 1',
      'Test type 2',
      'Test type 3',
    ])
  })
})
