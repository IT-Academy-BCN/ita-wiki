import { vi, describe, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { CardResource } from '../../components/organisms'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { TCardResource, TFavorites, TResource } from '../../types'
import { queryClient } from '../setup'

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual = (await vi.importActual(
      '../../context/AuthProvider'
    )) as typeof import('../../context/AuthProvider')
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...actual,
      useAuth: vi.fn(),
    }
  })

  // vi.mock('@tanstack/react-query', async () => {
  //   const actual = await vi.importActual('@tanstack/react-query')
  //   return {
  //     ...actual,
  //     useMutation: vi.fn(),
  //   }
  // })

  // vi.mock('../../helpers/fetchers', () => ({
  //   updateVote: vi.fn(),
  // }))
})

const handleAccessModal = vi.fn()

const handleClick = vi.fn()

afterEach(() => {
  vi.resetAllMocks()
})

const mockCardResource: TCardResource = {
  id: 'resourceId1',
  title: 'Test resource title',
  description: 'Test resource description 12345',
  url: 'https://www.google.com',
  img: 'profileAvatar.jpg',
  createdBy: 'Test author name',
  createdAt: '2022-08-09T09:42:25.717Z',
  updatedAt: '2023-07-09T09:42:25.717Z',
  voteCount: {
    upvote: 0,
    downvote: 0,
    total: 124,
    userVote: 0,
  },
  resourceType: 'video',
  topics: [],
  editable: true,
  isFavorite: false,
  handleAccessModal,
}

const mockFavCardResource: TCardResource = {
  id: 'resourceId2',
  title: 'Test resource title2',
  description: 'Test resource description 54321',
  url: 'https://www.github.com',
  img: 'profileAvatar.jpg',
  createdBy: 'Test author name',
  createdAt: '2022-08-09T10:42:25.717Z',
  updatedAt: '2023-07-09T10:42:25.717Z',
  voteCount: {
    upvote: 0,
    downvote: 0,
    total: 65,
    userVote: 0,
  },
  resourceType: 'blog',
  topics: [],
  editable: true,
  isFavorite: true,
  handleAccessModal,
}

describe('CardResource component', () => {
  it('renders correctly', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<CardResource {...mockCardResource} />)
    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()
  })

  it('renders correctly when creator user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Test author name',
        avatarId: 'profileAvatar.jpg',
      },
    } as TAuthContext)
    render(<CardResource {...mockCardResource} />)

    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()

    const editIcon = screen.getByTestId('edit-icon')
    expect(editIcon).toBeInTheDocument()
    const favIcon = screen.getByTitle('Afegeix a preferits')
    expect(favIcon).toBeInTheDocument()
  })

  it('renders correctly when not-creator user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatarId: 'Adios',
      },
    } as TAuthContext)
    render(<CardResource {...mockCardResource} editable={false} />)

    expect(screen.getByText('Test resource title')).toBeInTheDocument()
    expect(
      screen.getByText('Test resource description 12345')
    ).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()

    const editIcon = screen.queryByTestId('edit-icon')
    expect(editIcon).not.toBeInTheDocument()
    const favIcon = screen.getByTitle('Afegeix a preferits')
    expect(favIcon).toBeInTheDocument()
  })

  it('cannot vote when user is not logged in', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<CardResource {...mockCardResource} />)

    const upvoteBtn = screen.getByTestId('increase')
    fireEvent.click(upvoteBtn)
    await waitFor(() => {
      expect(handleAccessModal).toHaveBeenCalled()
    })
  })

  it('can vote when the user is logged in, with getResources', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Test author name',
        avatarId: 'profileAvatar.jpg',
      },
    } as TAuthContext)

    queryClient.setQueryData(['getResources'], [mockCardResource.id])
    const queryData = queryClient.getQueryData(['getResources']) as TResource[]

    const { rerender } = render(
      <CardResource voteCount={queryData[0].voteCount} {...mockCardResource} />
    )

    const upvoteBtn = screen.getByTestId('increase')
    const downvoteBtn = screen.getByTestId('decrease')
    expect(upvoteBtn).toBeInTheDocument()
    expect(downvoteBtn).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()

    fireEvent.click(upvoteBtn)

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalled()
      expect(screen.getByText('125')).toBeInTheDocument()
    })
    await waitFor(() => {
      const queryDataUpdated = queryClient.getQueryData([
        'getResources',
      ]) as TResource[]

      rerender(
        <CardResource
          voteCount={queryDataUpdated[0].voteCount}
          {...mockCardResource}
        />
      )

      expect(screen.getByText('125')).toBeInTheDocument()
    })
  })

  it('should update vote cache in favorites when rendered in Profile page', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Test author name',
        avatarId: 'profileAvatar.jpg',
      },
    } as TAuthContext)

    queryClient.setQueryData(['getFavorites'], [mockFavCardResource.id])
    const queryFavData = queryClient.getQueryData([
      'getFavorites',
    ]) as TFavorites[]

    const { rerender } = render(
      <CardResource
        voteCount={queryFavData[0].voteCount}
        {...mockFavCardResource}
      />
    )

    const upvoteBtn = screen.getByTestId('increase')

    fireEvent.click(upvoteBtn)

    await waitFor(() => {
      const queryFavDataUpdated = queryClient.getQueryData([
        'getFavorites',
      ]) as TFavorites[]

      rerender(
        <CardResource
          voteCount={queryFavDataUpdated[0].voteCount}
          {...mockFavCardResource}
        />
      )
      expect(screen.getByText('66')).toBeInTheDocument()
    })
  })

  it('can vote when the user is logged in, with getResourcesByUser', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Test author name',
        avatarId: 'profileAvatar.jpg',
      },
    } as TAuthContext)
    queryClient.setQueryData(['getResourcesByUser'], [mockCardResource.id])
    const queryResourcesByUser = queryClient.getQueryData([
      'getResourcesByUser',
    ]) as TResource[]

    const { rerender } = render(
      <CardResource
        voteCount={queryResourcesByUser[0].voteCount}
        {...mockCardResource}
      />
    )

    const downvoteBtn = screen.getByTestId('decrease')
    expect(downvoteBtn).toBeInTheDocument()

    expect(screen.getByText('124')).toBeInTheDocument()

    fireEvent.click(downvoteBtn)
    await waitFor(() => {
      const queryResourcesByUserUpdated = queryClient.getQueryData([
        'getResourcesByUser',
      ]) as TResource[]

      rerender(
        <CardResource
          voteCount={queryResourcesByUserUpdated[0].voteCount}
          {...mockCardResource}
        />
      )
      expect(screen.getByText('123')).toBeInTheDocument()
    })
  })
})
