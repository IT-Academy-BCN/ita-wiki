import { vi } from 'vitest'
import { useParams, Params } from 'react-router-dom'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { FavoritesIcon } from '../../components/molecules'
import { queryClient } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { TFavorites, TResource } from '../../types'
import { server } from '../../__mocks__/server'

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
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'TestName',
      avatarId: 'TestAvatar',
      role: 'REGISTERED',
    },
  } as TAuthContext)
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

describe('FavoritesIcon', () => {
  it('renders component correctly with slug', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<FavoritesIcon resourceId="notFavoriteId" isFavorite={false} />)

    await waitFor(() => {
      const favIconDeselected = screen.getByText('favorite')
      expect(favIconDeselected).toBeInTheDocument()
      expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a preferits')
      expect(favIconDeselected).toHaveStyle(
        "font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;"
      )
      expect(
        screen.queryByTitle('Elimina de preferits')
      ).not.toBeInTheDocument()
    })
  })

  it('renders component correctly without slug', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: undefined,
    } as Readonly<Params>)

    render(<FavoritesIcon resourceId="notFavoriteId" isFavorite={false} />)

    await waitFor(() => {
      const favIconDeselected = screen.getByText('favorite')
      expect(favIconDeselected).toBeInTheDocument()
      expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a preferits')
      expect(favIconDeselected).toHaveStyle(
        "font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;"
      )
      expect(
        screen.queryByTitle('Elimina de preferits')
      ).not.toBeInTheDocument()
    })
  })

  it('renders component correctly when resource is favorite', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<FavoritesIcon resourceId="favoriteId" isFavorite />)

    await waitFor(() => {
      const favIconSelected = screen.getByText('favorite')
      expect(favIconSelected).toBeInTheDocument()
      expect(favIconSelected).toHaveAttribute('title', 'Elimina de preferits')
      expect(favIconSelected).toHaveStyle(
        "font-variation-settings: 'FILL' 1, 'wght' 400,'GRAD' 0, 'opsz' 48;"
      )
      expect(screen.queryByTitle('Afegeix a preferits')).not.toBeInTheDocument()
    })
  })

  it('should change to favorite when user clicks on it', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: undefined,
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
    expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a preferits')
    expect(favIconDeselected).toHaveStyle(
      "font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;"
    )
    expect(screen.queryByTitle('Elimina de preferits')).not.toBeInTheDocument()

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
      expect(favIconDeselected).toHaveAttribute('title', 'Elimina de preferits')
      expect(favIconDeselected).toHaveStyle(
        "font-variation-settings: 'FILL' 1, 'wght' 400,'GRAD' 0, 'opsz' 48;"
      )
      expect(screen.queryByTitle('Afegeix a preferits')).not.toBeInTheDocument()
    })
  })

  it('should invalidate favorites queries when resource is changed to favorite', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    const spyInvalidate = vi
      .spyOn(queryClient, 'invalidateQueries')
      .mockImplementation(() => Promise.resolve())

    render(<FavoritesIcon resourceId="notFavoriteId" isFavorite={false} />)

    const favIconDeselected = screen.getByText('favorite')

    expect(favIconDeselected).toBeInTheDocument()

    expect(favIconDeselected).toHaveStyle(
      "font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;"
    )

    fireEvent.click(favIconDeselected)

    await waitFor(() => {
      expect(spyInvalidate).toHaveBeenCalledWith({
        queryKey: ['getFavorites'],
      })
      expect(spyInvalidate).not.toHaveBeenCalledWith({
        queryKey: ['getResourcesByUser'],
      })
    })
  })

  it('should change to not favorite when user clicks on it', async () => {
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
    expect(favIconSelected).toHaveAttribute('title', 'Elimina de preferits')
    expect(favIconSelected).toHaveStyle(
      "font-variation-settings: 'FILL' 1, 'wght' 400,'GRAD' 0, 'opsz' 48;"
    )
    expect(screen.queryByTitle('Afegeix a preferits')).not.toBeInTheDocument()

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

      expect(favIconSelected).toHaveAttribute('title', 'Afegeix a preferits')
      expect(favIconSelected).toHaveStyle(
        "font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;"
      )
      expect(
        screen.queryByTitle('Elimina de preferits')
      ).not.toBeInTheDocument()
    })
  })

  it('should remove the resource from getFavorites array when user removes favorite', async () => {
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

    render(
      <FavoritesIcon
        resourceId={resourceFavoriteMock.id}
        isFavorite={queryData[0].isFavorite}
      />
    )

    const favIconSelected = screen.getByText('favorite')

    expect(favIconSelected).toHaveStyle(
      "font-variation-settings: 'FILL' 1, 'wght' 400,'GRAD' 0, 'opsz' 48;"
    )

    const previousFavorites = queryClient.getQueryData([
      'getFavorites',
    ]) as TFavorites[]

    expect(previousFavorites).toHaveLength(2)

    fireEvent.click(favIconSelected)

    await waitFor(() => {
      const updatedFavorites = queryClient.getQueryData([
        'getFavorites',
      ]) as TFavorites[]

      expect(updatedFavorites).toHaveLength(1)
    })
  })

  it('should update cache in resources/me when rendered in Profile page', async () => {
    queryClient.setQueryData(['getResourcesByUser'], [resourceNotFavoriteMock])
    const queryResourcesByUser = queryClient.getQueryData([
      'getResourcesByUser',
    ]) as TResource[]
    const { rerender } = render(
      <FavoritesIcon
        resourceId={resourceNotFavoriteMock.id}
        isFavorite={queryResourcesByUser[0].isFavorite}
        fromProfile
      />
    )

    const favIconUnselected = screen.getByText('favorite')
    expect(favIconUnselected).toBeInTheDocument()
    expect(favIconUnselected).toHaveStyle(
      "font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;"
    )

    fireEvent.click(favIconUnselected)
    await waitFor(() => {
      const queryResourcesByUserUpdated = queryClient.getQueryData([
        'getResourcesByUser',
      ]) as TResource[]
      rerender(
        <FavoritesIcon
          resourceId={resourceNotFavoriteMock.id}
          isFavorite={queryResourcesByUserUpdated[0].isFavorite}
          fromProfile
        />
      )

      expect(favIconUnselected).toHaveAttribute('title', 'Elimina de preferits')
      expect(favIconUnselected).toHaveStyle(
        "font-variation-settings: 'FILL' 1, 'wght' 400,'GRAD' 0, 'opsz' 48;"
      )
      expect(screen.queryByTitle('Afegeix a preferits')).not.toBeInTheDocument()
    })
  })

  it('renders correctly on error (fav icon does not change)', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    server.use(...errorHandlers)

    render(<FavoritesIcon resourceId="favoriteId" isFavorite={false} />)

    const favIconDeselected = screen.getByText('favorite')
    expect(favIconDeselected).toBeInTheDocument()
    expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a preferits')
    expect(favIconDeselected).toHaveStyle(
      "font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;"
    )
    expect(screen.queryByTitle('Elimina de preferits')).not.toBeInTheDocument()

    fireEvent.click(favIconDeselected)

    await waitFor(() => {
      expect(favIconDeselected).toHaveAttribute('title', 'Afegeix a preferits')
      expect(favIconDeselected).toHaveStyle(
        "font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;"
      )
      expect(
        screen.queryByTitle('Elimina de preferits')
      ).not.toBeInTheDocument()
    })
  })
})
