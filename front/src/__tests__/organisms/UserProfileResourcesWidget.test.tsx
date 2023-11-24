import { vi } from 'vitest'
import { render, renderHook, screen, fireEvent, waitFor } from '../test-utils'
import { UserProfileResourcesWidget } from '../../components/organisms'
import { useSortByDate, useSortByVotes } from '../../hooks'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const arrayFavs = [
  {
    id: 'favoriteId',
    title: 'My favorite title',
    slug: 'my-favorite',
    description: 'Favorite description',
    url: 'https://tutorials.cat/learn/javascript',
    resourceType: 'VIDEO',
    userId: 'userId',
    createdAt: '2021-09-28',
    updatedAt: '2022-09-12',
    status: 'NOT_SEEN',
    voteCount: {
      userVote: 0,
      upvote: 3,
      downvote: 0,
      total: 3,
    },
    topics: [
      {
        topic: {
          id: 'topicId',
          name: 'topic Name',
          slug: 'topicSlug',
          categoryId: 'categoryId',
          createdAt: 'date',
          updatedAt: 'update',
        },
      },
    ],
  },
  {
    id: 'secondFavoriteId',
    title: 'My favorite title 2',
    slug: 'my-favorite-two',
    description: 'Favorite description two',
    url: 'https://tutorials.cat/learn/',
    resourceType: 'VIDEO',
    userId: 'userId',
    createdAt: '2023-12-11',
    updatedAt: '2023-12-12',
    status: 'NOT_SEEN',
    voteCount: {
      userVote: 0,
      upvote: 4,
      downvote: 0,
      total: 4,
    },
    topics: [
      {
        topic: {
          id: 'topicId',
          name: 'topic Name',
          slug: 'topicSlug',
          categoryId: 'categoryId',
          createdAt: 'date',
          updatedAt: 'update',
        },
      },
    ],
  },
]

const arrayResources = [
  {
    id: 'myResourceId',
    title: 'My resource title',
    slug: 'my-resource',
    description: 'Resource description',
    url: 'https://tutorials.cat/learn/javascript',
    resourceType: 'VIDEO',
    userId: 'userId',
    createdAt: '11/11/2011',
    updatedAt: '12/12/2012',
    status: 'NOT_SEEN',
    voteCount: {
      userVote: 0,
      upvote: 3,
      downvote: 0,
      total: 3,
    },
    topics: [
      {
        topic: {
          id: 'topicId',
          name: 'topic Name',
          slug: 'topicSlug',
          categoryId: 'categoryId',
          createdAt: 'date',
          updatedAt: 'update',
        },
      },
    ],
    isFavorite: false,
  },
]

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
      name: 'Hola',
      avatarId: 'Adios',
    },
  } as TAuthContext)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('UserProfileResourcesWidget component', () => {
  it('renders correctly', () => {
    render(
      <UserProfileResourcesWidget
        title="Test title"
        titleMobile="Test title mobile"
        resourcesArray={[]}
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText(/test title mobile/i)).toBeInTheDocument()

    expect(screen.queryByText(/vots/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument()

    expect(screen.getByText(/no has publicat cap recurs/i)).toBeInTheDocument()

    expect(
      screen.queryByText(/no hi ha recursos favorits/i)
    ).not.toBeInTheDocument()
  })

  it('renders an empty favorite resources array', () => {
    render(
      <UserProfileResourcesWidget
        title="Recursos favorits"
        titleMobile="Test title fav mobile"
        resourcesArray={[]}
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText(/test title fav mobile/i)).toBeInTheDocument()

    expect(screen.queryByText(/vots/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument()

    expect(screen.getByText(/no hi ha recursos favorits/i)).toBeInTheDocument()
  })

  it('renders spinner when is loading', () => {
    render(
      <UserProfileResourcesWidget
        title="Recursos favorits"
        titleMobile="Test title fav mobile"
        resourcesArray={undefined}
        isLoading
        isError={false}
      />
    )

    expect(screen.getByText(/test title fav mobile/i)).toBeInTheDocument()

    expect(screen.getByRole('status')).toBeInTheDocument()

    expect(screen.queryByText(/vots/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument()

    expect(
      screen.queryByText(/no hi ha recursos favorits/i)
    ).not.toBeInTheDocument()
  })

  it('renders correctly with a favorite resources array', async () => {
    render(
      <UserProfileResourcesWidget
        title="Recursos favorits"
        titleMobile="Test title mobile"
        resourcesArray={arrayFavs}
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText(/recursos favorits/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/vots/i)).toBeInTheDocument()
      expect(screen.getByText(/data/i)).toBeInTheDocument()
    })

    expect(screen.getByText('My favorite title')).toBeInTheDocument()

    expect(screen.getByText('My favorite title 2')).toBeInTheDocument()

    expect(screen.getByText('Favorite description')).toBeInTheDocument()

    expect(screen.getByText('Favorite description two')).toBeInTheDocument()

    expect(
      screen.queryByText(/no hi ha recursos favorits/i)
    ).not.toBeInTheDocument()

    const favIcons = screen.getAllByText('favorite')

    expect(favIcons).toHaveLength(2)

    favIcons.forEach((favIcon) => {
      expect(favIcon).toHaveAttribute('title', 'Elimina de favorits')
    })
  })

  it("renders correctly with a user's resources array", async () => {
    render(
      <UserProfileResourcesWidget
        title="Test title"
        titleMobile="Test title mobile"
        resourcesArray={arrayResources}
        isLoading={false}
        isError={false}
      />
    )

    expect(screen.getByText(/test title mobile/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/vots/i)).toBeInTheDocument()
      expect(screen.getByText(/data/i)).toBeInTheDocument()
    })

    expect(screen.getByText('My resource title')).toBeInTheDocument()

    expect(screen.getByText('Resource description')).toBeInTheDocument()

    expect(screen.getByAltText('Edita el recurs')).toBeInTheDocument()

    expect(screen.getByText('favorite')).toBeInTheDocument()

    expect(screen.getByText('favorite')).toHaveAttribute(
      'title',
      'Afegeix a favorits'
    )

    expect(
      screen.queryByText(/no has publicat cap recurs/i)
    ).not.toBeInTheDocument()
  })
})

it('sorts resources by date in descending order', async () => {
  render(
    <UserProfileResourcesWidget
      title="Test title"
      titleMobile="Test title mobile"
      resourcesArray={arrayFavs}
      isLoading={false}
      isError={false}
    />
  )

  await waitFor(() => {
    expect(screen.getByText(/data/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText(/data/i))
  })

  const { result } = renderHook(() =>
    useSortByDate(arrayFavs, 'updatedAt', 'desc')
  )

  expect(result.current.sortedItems).toEqual([
    {
      id: 'secondFavoriteId',
      title: 'My favorite title 2',
      slug: 'my-favorite-two',
      description: 'Favorite description two',
      url: 'https://tutorials.cat/learn/',
      resourceType: 'VIDEO',
      userId: 'userId',
      createdAt: '2023-12-11',
      updatedAt: '2023-12-12',
      status: 'NOT_SEEN',
      voteCount: {
        userVote: 0,
        upvote: 4,
        downvote: 0,
        total: 4,
      },
      topics: [
        {
          topic: {
            id: 'topicId',
            name: 'topic Name',
            slug: 'topicSlug',
            categoryId: 'categoryId',
            createdAt: 'date',
            updatedAt: 'update',
          },
        },
      ],
    },
    {
      id: 'favoriteId',
      title: 'My favorite title',
      slug: 'my-favorite',
      description: 'Favorite description',
      url: 'https://tutorials.cat/learn/javascript',
      resourceType: 'VIDEO',
      userId: 'userId',
      createdAt: '2021-09-28',
      updatedAt: '2022-09-12',
      status: 'NOT_SEEN',
      voteCount: {
        userVote: 0,
        upvote: 3,
        downvote: 0,
        total: 3,
      },
      topics: [
        {
          topic: {
            id: 'topicId',
            name: 'topic Name',
            slug: 'topicSlug',
            categoryId: 'categoryId',
            createdAt: 'date',
            updatedAt: 'update',
          },
        },
      ],
    },
  ])
})

it('sorts resources by votes in descending order', async () => {
  render(
    <UserProfileResourcesWidget
      title="Test title"
      titleMobile="Test title mobile"
      resourcesArray={arrayFavs}
      isLoading={false}
      isError={false}
    />
  )

  await waitFor(() => {
    expect(screen.getByText(/vots/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText(/vots/i))
  })

  const { result } = renderHook(() => useSortByVotes(arrayFavs, 'desc'))
  const sortedResources = result.current.sortedVotes

  const voteCounts = sortedResources.map((vote) => vote.voteCount.total)

  expect(voteCounts).toEqual([4, 3])
})

it('renders error message when there is an error', () => {
  render(
    <UserProfileResourcesWidget
      title="Recursos favorits"
      titleMobile="Test title fav mobile"
      resourcesArray={undefined}
      isLoading={false}
      isError
    />
  )

  expect(screen.getByText(/test title fav mobile/i)).toBeInTheDocument()

  expect(screen.queryByText(/vots/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/data/i)).not.toBeInTheDocument()

  expect(
    screen.getByText(/alguna cosa ha anat malament.../i)
  ).toBeInTheDocument()

  expect(screen.queryByRole('status')).not.toBeInTheDocument()

  expect(
    screen.queryByText(/no hi ha recursos favorits/i)
  ).not.toBeInTheDocument()
})
