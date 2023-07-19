import { setupServer } from 'msw/node'
import { vi } from 'vitest'
import { render, screen, waitFor } from '../test-utils'
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

    render(<MyResources categories={[]} />)

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

    render(<MyResources categories={[]} />)
  })

  it('shows error message if user is not logged', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    server.use(...errorHandlers)

    render(<MyResources categories={[]} />)
  })

  it('receives data when API call returns 200 and the user has no resources', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)

    render(<MyResources categories={[]} />)
  })

  it('shows correct title when resizes to mobile', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)

    global.innerWidth = 600
    render(<MyResources categories={[]} />)

    const title = screen.getByTestId('main-title')
    expect(title).toHaveTextContent('Tus recursos')
  })

  it('shows correct title when resizes to laptop', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)

    global.innerWidth = 1024
    render(<MyResources categories={[]} />)

    const title = screen.getByTestId('main-title')
    expect(title).toHaveTextContent('Mis recursos')
  })

  it('shows cards when resizes to mobile', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)

    global.innerWidth = 600
    render(<MyResources categories={[]} />)

    await waitFor(() => {
      expect(screen.queryByTestId('resource-card')).toBeInTheDocument()
    })
  })

  it('shows ResourceTitleLink when resizes to laptop', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)

    global.innerWidth = 1024
    render(<MyResources categories={[]} />)

    await waitFor(() => {
      expect(screen.queryByTestId('resource-title')).toBeInTheDocument()
    })
  })
})
