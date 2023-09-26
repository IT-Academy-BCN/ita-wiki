import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'
import { useGetFavorites } from '../../hooks'

describe('useGetFavorites', () => {
  it("gets an array of user's favorite resources", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetFavorites(), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toHaveLength(1)
  })
})
