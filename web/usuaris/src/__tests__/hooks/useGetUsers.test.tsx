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
        id: '1',
        name: 'Ona Sitgar',
        dni: '12345678A',
        status: 'PENDING',
        createdAt: '2023/11/05 00:00:00.000',
        itineraryName: 'Backend Node',
      },
      {
        id: '2',
        name: 'Marc Bofill',
        dni: '87654321B',
        status: 'ACTIVE',
        createdAt: '2023/11/05 00:00:00.000',
        itineraryName: 'Frontend React',
      },
      {
        id: '3',
        name: 'Montserrat Capdevila',
        dni: '45678912C',
        status: 'BLOCKED',
        createdAt: '2023/11/05 00:00:00.000',
        itineraryName: 'Fullstack Php',
      },
    ])
  })
})
