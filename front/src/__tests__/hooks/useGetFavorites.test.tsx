import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../../context/AuthProvider'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'
import { useGetFavorites } from '../../hooks'

describe('useGetFavorites', () => {
  it("gets an array of user's favorite resources when user is logged in", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    )
    const { result } = renderHook(() => useGetFavorites(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  })
})
