import { vi } from 'vitest'
import { useParams, Params } from 'react-router-dom'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { FavoritesIcon } from '../../components/molecules'
import { mswServer, queryClient } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { TFavorites, TResource } from '../../types'

const resourceNotFavoriteMock = {
  id: 'testNotFavorite',
  isFavorite: false,
}

const resourceFavoriteMock = {
  id: 'testFavorite',
  isFavorite: true,
}

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
  queryClient.clear()
  vi.restoreAllMocks()
})

describe('FavoritesWidget', () => {
  it('renders component correctly', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
        email: 'mail@domain.com',
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
        email: 'mail@domain.com',
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
        email: 'mail@domain.com',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    queryClient.setQueryData(['getResources'], [resourceNotFavoriteMock])
    const queryData = queryClient.getQueryData(['getResources']) as TResource[]
    const { rerender } = render(
      <FavoritesIcon
        resourceId={resourceNotFavoriteMock.id}
        isFavorite={queryData[0].isFavorite}
      />
    )

    const favIconDeselected = screen.getByText('favorite')

    expect(favIconDeselected).toBeInTheDocument()
    expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a favorits')
    expect(favIconDeselected).toHaveAttribute('fill', '0')
    expect(screen.queryByTitle('Elimina de favorits')).not.toBeInTheDocument()

    fireEvent.click(favIconDeselected)
    await waitFor(() => {
      const queryDataUpdated = queryClient.getQueryData([
        'getResources',
      ]) as TResource[]
      rerender(
        <FavoritesIcon
          resourceId={resourceNotFavoriteMock.id}
          isFavorite={queryDataUpdated[0].isFavorite}
        />
      )
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
        email: 'mail@domain.com',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    queryClient.setQueryData(['getResources'], [resourceFavoriteMock])
    const queryData = queryClient.getQueryData(['getResources']) as TResource[]

    const { rerender } = render(
      <FavoritesIcon
        resourceId={resourceFavoriteMock.id}
        isFavorite={queryData[0].isFavorite}
      />
    )

    const favIconSelected = screen.getByText('favorite')

    expect(favIconSelected).toBeInTheDocument()
    expect(favIconSelected).toHaveAttribute('title', 'Elimina de favorits')
    expect(favIconSelected).toHaveAttribute('fill', '1')
    expect(screen.queryByTitle('Afegeix a favorits')).not.toBeInTheDocument()

    fireEvent.click(favIconSelected)

    await waitFor(() => {
      const queryDataUpdated = queryClient.getQueryData([
        'getResources',
      ]) as TResource[]
      rerender(
        <FavoritesIcon
          resourceId={resourceFavoriteMock.id}
          isFavorite={queryDataUpdated[0].isFavorite}
        />
      )

      expect(favIconSelected).toHaveAttribute('title', 'Afegeix a favorits')
      expect(favIconSelected).toHaveAttribute('fill', '0')
      expect(screen.queryByTitle('Elimina de favorits')).not.toBeInTheDocument()
    })
  })

  it('should remove the favorite from getFavorites array when user click changes to remove favorite', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
        email: 'mail@domain.com',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    queryClient.setQueryData(
      ['getFavorites'],
      [
        {
          id: resourceFavoriteMock.id,
          isFavorite: true,
        },
        {
          id: 'anotherFavoriteId',
          isFavorite: true,
        },
      ]
    )
    queryClient.setQueryData(['getResources'], [resourceFavoriteMock])
    const queryData = queryClient.getQueryData(['getResources']) as TResource[]

    const { rerender } = render(
      <FavoritesIcon
        resourceId={resourceFavoriteMock.id}
        isFavorite={queryData[0].isFavorite}
      />
    )

    const favIconSelected = screen.getByText('favorite')

    expect(favIconSelected).toHaveAttribute('fill', '1')

    fireEvent.click(favIconSelected)

    await waitFor(() => {
      const queryDataUpdated = queryClient.getQueryData([
        'getResources',
      ]) as TResource[]
      rerender(
        <FavoritesIcon
          resourceId={resourceFavoriteMock.id}
          isFavorite={queryDataUpdated[0].isFavorite}
        />
      )

      expect(favIconSelected).toHaveAttribute('fill', '0')
    })

    const updatedFavorites = queryClient.getQueryData([
      'getFavorites',
    ]) as TFavorites[]
    expect(updatedFavorites).not.toContain({
      id: resourceFavoriteMock.id,
      isFavorite: true,
    })
  })

  it('renders correctly on error (fav icon does not change)', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
        email: 'mail@domain.com',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    mswServer.use(...errorHandlers)

    render(<FavoritesIcon resourceId="favoriteId" isFavorite={false} />)

    const favIconDeselected = screen.getByText('favorite')
    expect(favIconDeselected).toBeInTheDocument()
    expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a favorits')
    expect(favIconDeselected).toHaveAttribute('fill', '0')
    expect(screen.queryByTitle('Elimina de favorits')).not.toBeInTheDocument()

    fireEvent.click(favIconDeselected)

    await waitFor(() => {
      expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a favorits')
      expect(favIconDeselected).toHaveAttribute('fill', '0')
      expect(screen.queryByTitle('Elimina de favorits')).not.toBeInTheDocument()
    })
  })
})
