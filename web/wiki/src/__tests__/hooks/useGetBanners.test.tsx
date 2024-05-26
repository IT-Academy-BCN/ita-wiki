import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../setup'
import { renderHook, waitFor } from '../test-utils'
import { useGetBanners } from '../../hooks'

describe('useGetBanners', () => {
  it('gets an array of saved banners', async () => {
    const { result } = renderHook(() => useGetBanners(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toEqual([
      {
        title: 'ITAcademy',
        description: 'Aprende a programar en 18 semanas y reprograma tu futuro',
        url: 'https://images.unsplash.com/photo-1601467295274-f2408b6e90f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ])
  })
})
