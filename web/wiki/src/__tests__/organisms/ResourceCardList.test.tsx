import { vi } from 'vitest'
import { render, screen, waitFor } from '../test-utils'
import { ResourceCardList } from '../../components/organisms'
import { TResource } from '../../types'

const mockedResourcesData: TResource[] = [
  {
    id: '1',
    title: 'Resource Test',
    slug: 'resource-test',
    description: 'Resource test description',
    url: 'http://www.example.com/resourceTest',
    createdAt: '2023-01-01T12:00:00Z',
    updatedAt: '2023-01-02T12:00:00Z',
    user: {
      name: 'Author Name',
      avatarId: 'avatar.jpg',
    },
    voteCount: {
      upvote: 5,
      downvote: 2,
      total: 3,
      userVote: 1,
    },
    resourceType: 'Tipo 1',
    topics: [],
    isFavorite: true,
  },
]

describe('ResourceCardList', () => {
  const handleAccessModal = vi.fn()
  afterEach(() => {
    afterEach(() => {
      vi.restoreAllMocks()
    })
  })

  it('renders ResourceCard correctly on success', async () => {
    render(
      <ResourceCardList
        handleAccessModal={handleAccessModal}
        sortOrder="desc"
        isSortByVotesActive
        resourcesError={undefined}
        resourcesLoading
        resourcesData={mockedResourcesData}
      />
    )

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()
    await waitFor(() => {
      expect(spinnerComponent).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Resource Test')).toBeInTheDocument()
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        'http://www.example.com/resourceTest'
      )
      expect(screen.queryByTestId('emptyResource')).not.toBeInTheDocument()
    })
  })

  it('renders message when Category does not have Resources', async () => {
    render(
      <ResourceCardList
        handleAccessModal={handleAccessModal}
        sortOrder="desc"
        isSortByVotesActive
        resourcesError={undefined}
        resourcesLoading
        resourcesData={[]}
      />
    )

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByTestId('emptyResource')).toBeInTheDocument()
      expect(screen.queryByText('Resource Test')).not.toBeInTheDocument()
    })
  })

  it('renders correctly on error', () => {
    render(
      <ResourceCardList
        handleAccessModal={handleAccessModal}
        sortOrder="desc"
        isSortByVotesActive
        resourcesError
        resourcesLoading={false}
        resourcesData={undefined}
      />
    )

    expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    expect(screen.queryByText('Resource Test')).not.toBeInTheDocument()
  })
})
