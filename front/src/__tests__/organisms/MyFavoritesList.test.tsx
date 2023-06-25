import { setupServer } from 'msw/node'
import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import { MyFavoritesList } from '../../components/organisms'
import { handlers } from '../../__mocks__/handlers'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})
afterAll(() => {
  server.close()
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
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
      },
    } as TAuthContext)

    render(<MyFavoritesList />)
    expect(screen.getByTestId('title')).toBeInTheDocument()
  })
})
