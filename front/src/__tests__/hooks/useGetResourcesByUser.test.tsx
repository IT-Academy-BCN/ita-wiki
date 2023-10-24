import { setupServer } from 'msw/node'
import { vi } from 'vitest'
import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor, act } from '../test-utils'
import { queryClient } from '../setup'
import { useGetResourcesByUser } from '../../hooks'
import { handlers } from '../../__mocks__/handlers' // Importa tus manejadores
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})
afterAll(() => server.close())

describe('useGetResourcesByUser', () => {
  beforeEach(() => {
    vi.mock('../../context/AuthProvider', async () => {
      const actual = await vi.importActual('../../context/AuthProvider')
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...actual,
        useAuth: vi.fn(),
      }
    })
  })

  it('fetches resources for a user', async () => {
    act(() => {
      vi.mocked(useAuth).mockReturnValue({
        user: {
          name: 'Hola',
          avatar: 'Adios',
        },
      } as TAuthContext)

      const { result } = renderHook(
        () => useGetResourcesByUser('categorySlug'),
        {
          wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          ),
        }
      )

      // Espera a que se complete la solicitud
      waitFor(() => {
        expect(result.current.isLoading).toBeFalsy()
        expect(result.current.error).toBeNull()
        expect(result.current.data).toEqual([
          { id: 1, title: 'Resource 1' },
          { id: 2, title: 'Resource 2' },
        ])
      })
    })
  })
})
