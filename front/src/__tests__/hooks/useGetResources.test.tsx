import { QueryClientProvider } from '@tanstack/react-query'
import { useGetResources } from '../../hooks/useGetResources'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'
import { TFilters } from '../../types'

describe('useGetResources', () => {
  it('gets an array resources ', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetResources(), { wrapper })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toHaveLength(1)
  })
  it('handles filters correctly', async () => {
    const filters: TFilters = {
      slug: 'example-slug',
      resourceTypes: ['type1', 'type2'],
      status: ['published'],
      topic: 'example-topic',
    }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetResources(filters), {
      wrapper,
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())
  })
})
