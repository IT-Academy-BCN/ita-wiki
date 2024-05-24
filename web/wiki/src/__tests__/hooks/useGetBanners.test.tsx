// import { QueryClientProvider } from '@tanstack/react-query'
// import { AuthProvider } from '../../context/AuthProvider'
import { renderHook, waitFor } from '../test-utils'
// import { queryClient } from '../setup'
import { useGetBanners } from '../../hooks'

describe('useGetBanners', () => {
  it('gets an array of saved banners', async () => {
    const { result } = renderHook(() => useGetBanners())

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  })
})
