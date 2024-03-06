import { QueryClientProvider } from '@tanstack/react-query'
import { useGetUsers } from '../../hooks/useGetUsers'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'

describe('useGetUsers', () => {
  it('fetches users successfully', async () => {
    const { result } = renderHook(() => useGetUsers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())

    expect(result.current.data).toEqual([
      {
        id: 'TestId',
        name: 'Test Name',
        status: 'INACTIVE',
        createdAt: '2023-11-15T15:36:02.234Z',
        itineraryName: 'backend-node',
      },
    ])
  })
})
