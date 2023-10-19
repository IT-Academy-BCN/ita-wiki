import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'
import { useGetTopics } from '../../hooks'

describe('useGetTopics', () => {
  it('gets an array of topics for a category', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetTopics('react'), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toHaveLength(2)
  })
})
