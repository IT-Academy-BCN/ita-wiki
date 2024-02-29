import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'
import { useGetResourcesByUser } from '../../hooks'
import { AuthProvider } from '../../context/AuthProvider'

describe('useGetResourcesByUser', () => {
  it('fetches resources for a user', async () => {
    const { result } = renderHook(() => useGetResourcesByUser('categorySlug'), {
      wrapper: ({ children }) => (
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AuthProvider>
      ),
    })

    waitFor(() => {
      expect(result.current.isLoading).toBeFalsy()
      expect(result.current.isError).toBeNull()
      expect(result.current.data).toEqual([
        { id: 1, title: 'Resource 1' },
        { id: 2, title: 'Resource 2' },
      ])
    })
  })
})
