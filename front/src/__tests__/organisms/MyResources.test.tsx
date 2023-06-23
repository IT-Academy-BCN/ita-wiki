import { setupServer } from 'msw/node'
import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import { MyResources } from '../../components/organisms'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { handlers, errorHandlers } from '../../__mocks__/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})
afterAll(() => server.close())

describe('MyResources', () => {
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
  it('renders MyResources component', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)

    render(<MyResources />)

    expect(screen.queryByTestId('title')).toBeInTheDocument()
  })

  it('shows error message if resources request fails', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)

    server.use(...errorHandlers)

    render(<MyResources />)
  })
  it('shows error message if user is not logged', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    server.use(...errorHandlers)

    render(<MyResources />)
  })
})
