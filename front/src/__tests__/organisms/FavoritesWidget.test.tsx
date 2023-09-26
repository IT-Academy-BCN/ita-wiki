import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { FavoritesWidget } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

beforeEach(() => {
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'Name',
      avatar: 'Avatar',
    },
  } as TAuthContext)

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

afterEach(() => {
  vi.restoreAllMocks()
})

describe('FavoritesWidget', () => {
  it('renders component correctly', () => {
    render(<FavoritesWidget resourceId="testResourceId" />)

    expect(screen.getByTitle('Añadir a favoritos')).toBeInTheDocument()
  })

  //MOCK GETRESOURCES / MARCA FILL + "Eliminar" text
  //TEst on Click que s'invoca el mock. com a TypesWidget i canvia aspecte?

  it.only('renders component correctly when resource is favorite', async () => {
    render(<FavoritesWidget resourceId="favoriteId" />)
    await waitFor(() => {
      expect(screen.getByTitle('Eliminar de favoritos')).toBeInTheDocument()
    })
    //NO sé com enganxar amb
  })

  it('renders correctly on error (favorite deselected)', async () => {
    mswServer.use(...errorHandlers)

    render(<FavoritesWidget resourceId="testResourceId" />)

    await waitFor(() => {
      expect(screen.getByTitle('Añadir a favoritos')).toBeInTheDocument()
    })
  })
})
