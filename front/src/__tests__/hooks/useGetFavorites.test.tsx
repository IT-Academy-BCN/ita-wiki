import { setupServer } from 'msw/node'
import { QueryClientProvider } from '@tanstack/react-query'
import { waitFor, renderHook } from '../test-utils'
import { handlers } from '../../__mocks__/handlers'
import { useGetFavorites } from '../../hooks'
import { queryClient } from '../setup'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

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
