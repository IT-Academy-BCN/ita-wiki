import { setupServer } from 'msw/node'
import { expect, vi } from 'vitest'
import { render, screen, waitFor } from '../test-utils'
import { MyFavoritesList } from '../../components/organisms'
import { errorHandlers, handlers } from '../../__mocks__/handlers'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const server = setupServer(...handlers)

beforeEach(() => {
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'Name',
      avatar: 'Avatar',
    },
  } as TAuthContext)
})

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})

afterAll(() => server.close())

describe('MyFavoritesList', () => {
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

  it('renders correctly', async () => {
    render(<MyFavoritesList categories={[]} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    expect(screen.getByTestId('title')).toBeInTheDocument()

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())
  })

  it('shows message if user is not logged', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<MyFavoritesList categories={[]} />)
  })

  it('receives data when API call returns 200 and the user has no favorite resources', async () => {
    render(<MyFavoritesList categories={[]} />)
  })

  it('shows correct title when resize to mobile', async () => {
    global.innerWidth = 600
    render(<MyFavoritesList categories={[]} />)
    const titleElement = screen.getByTestId('title')
    expect(titleElement).toHaveTextContent('Recursos que te gustan')
  })

  it('shows correct title when resize to desktop', async () => {
    global.innerWidth = 1024
    render(<MyFavoritesList categories={[]} />)
    const titleElement = screen.getByTestId('title')
    expect(titleElement).toHaveTextContent('Recursos favoritos')
  })

  it.skip('renders correctly on error', async () => {
    server.use(...errorHandlers)
    render(<MyFavoritesList categories={[]} />)
    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Algo ha ido mal...')).toBeInTheDocument()
    })
  })
})
