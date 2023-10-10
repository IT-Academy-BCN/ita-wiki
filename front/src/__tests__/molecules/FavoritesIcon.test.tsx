import { vi } from 'vitest'
import { useParams, Params } from 'react-router-dom'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { FavoritesIcon } from '../../components/molecules'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

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
  vi.mock('react-router-dom', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      'react-router-dom'
    )
    return {
      ...actual,
      useParams: vi.fn(),
    }
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('FavoritesWidget', () => {
  it('renders component correctly', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<FavoritesIcon resourceId="notFavoriteId" isFavorite={false} />)

    await waitFor(() => {
      const favIconDeselected = screen.getByText('favorite')
      expect(favIconDeselected).toBeInTheDocument()
      expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a favorits')
      expect(favIconDeselected).toHaveAttribute('fill', '0')
      expect(screen.queryByTitle('Elimina de favorits')).not.toBeInTheDocument()
    })
  })

  it('renders component correctly when resource is favorite', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<FavoritesIcon resourceId="favoriteId" isFavorite />)

    await waitFor(() => {
      const favIconSelected = screen.getByText('favorite')
      expect(favIconSelected).toBeInTheDocument()
      expect(favIconSelected).toHaveAttribute('title', 'Elimina de favorits')
      expect(favIconSelected).toHaveAttribute('fill', '1')
      expect(screen.queryByTitle('Afegeix a favorits')).not.toBeInTheDocument()
    })
  })

  it('should change to favorite when user clicks on it', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<FavoritesIcon resourceId="notFavoriteId" isFavorite={false} />)

    const favIconDeselected = screen.getByText('favorite')

    await waitFor(() => {
      expect(favIconDeselected).toBeInTheDocument()
      expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a favorits')
      expect(favIconDeselected).toHaveAttribute('fill', '0')
      expect(screen.queryByTitle('Elimina de favorits')).not.toBeInTheDocument()
    })

    fireEvent.click(favIconDeselected)

    await waitFor(() => {
      expect(favIconDeselected).toHaveAttribute('title', 'Elimina de favorits')
      expect(favIconDeselected).toHaveAttribute('fill', '1')
      expect(screen.queryByTitle('Afegeix a favorits')).not.toBeInTheDocument()
    })
  })

  it('should change to not favorite when user clicks on it', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<FavoritesIcon resourceId="notFavoriteId" isFavorite />)

    const favIconDeselected = screen.getByText('favorite')

    await waitFor(() => {
      expect(favIconDeselected).toBeInTheDocument()
      expect(favIconDeselected).toHaveAttribute('title', 'Elimina de favorits')
      expect(favIconDeselected).toHaveAttribute('fill', '1')
      expect(screen.queryByTitle('Afegeix a favorits')).not.toBeInTheDocument()
    })

    fireEvent.click(favIconDeselected)

    await waitFor(() => {
      expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a favorits')
      expect(favIconDeselected).toHaveAttribute('fill', '0')
      expect(screen.queryByTitle('Elimina de favorits')).not.toBeInTheDocument()
    })
  })
})
