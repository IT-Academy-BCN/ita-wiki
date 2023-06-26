import { setupServer } from 'msw/node'
import { vi } from 'vitest'
import { render, screen } from '../test-utils'
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
    render(<MyFavoritesList />)
    expect(screen.getByTestId('title')).toBeInTheDocument()
  })

  it('shows error message if favorite resources fails', async () => {
    server.use(...errorHandlers)
    render(<MyFavoritesList />)
  })

  it('shows message if user is not logged', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    server.use(...errorHandlers)

    render(<MyFavoritesList />)
  })
})
