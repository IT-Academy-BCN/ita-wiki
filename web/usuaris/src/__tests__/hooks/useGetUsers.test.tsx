import { QueryClientProvider } from '@tanstack/react-query'
import { useGetUsers } from '../../hooks/useGetUsers'
import { renderHook, waitFor } from '../test-utils'
import { queryClient } from '../setup'
import { type TFilters } from '../../types'

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
        role: 'ADMIN',
        createdAt: '2023/11/05 00:00:00.000',
        itineraryName: 'Backend Node',
      },
      {
        id: '2',
        name: 'Marc Bofill',
        dni: '87654321B',
        status: 'ACTIVE',
        role: 'REGISTERED',
        createdAt: '2023/11/05 00:00:00.000',
        itineraryName: 'Frontend React',
      },
      {
        id: '3',
        name: 'Montserrat Capdevila',
        dni: '45678912C',
        status: 'BLOCKED',
        role: 'REGISTERED',
        createdAt: '2023/11/05 00:00:00.000',
        itineraryName: 'Fullstack Php',
      },
      {
        id: '4',
        name: 'Anna Brull',
        dni: '45678912D',
        status: 'BLOCKED',
        role: 'ADMIN',
        createdAt: '2023/11/05 00:00:00.000',
        itineraryName: 'Frontend React',
      },
      {
        id: '5',
        name: 'Marc Serra',
        dni: '12378912D',
        status: 'BLOCKED',
        role: 'ADMIN',
        createdAt: '2023/11/05 00:00:00.000',
        itineraryName: 'Frontend Angular',
      },
    ])
  })

  it('handles filters correctly', async () => {
    const filters: TFilters = {
      itinerarySlug: 'example-slug',
      status: 'ACTIVE',
      startDate: '2023-03-05T00:00:00.000Z',
      endDate: '2026-03-05T00:00:00.000Z',
      name: 'John Doe',
      dni: '99999999R',
    }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetUsers(filters), {
      wrapper,
    })

    await waitFor(() => expect(result.current.data).toBeTruthy())
  })
})
