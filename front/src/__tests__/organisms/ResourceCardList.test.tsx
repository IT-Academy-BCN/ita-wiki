import { vi } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import { render, screen, waitFor } from '../test-utils'
import { ResourceCardList } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { TResource } from '../../types'

describe('ResourceCardList', () => {
  const handleAccessModal = vi.fn()
  afterEach(() => {
    afterEach(() => {
      vi.restoreAllMocks()
      mswServer.resetHandlers()
    })
  })

  it('renders ResourceCard correctly on success', async () => {
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
    render(
      <Routes>
        <Route
          path="/category/:slug"
          element={
            <ResourceCardList
              handleAccessModal={handleAccessModal}
              sortOrder="desc"
              isSortByVotesActive
              onSelectedSortOrderChange={() => ''}
              resourcesError={undefined}
              resourcesLoading
              resourcesData={mockedResourcesData}
            />
          }
        />
      </Routes>,
      {
        initialEntries: ['/category/resourceTest'],
      }
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
      <Routes>
        <Route
          path="/category/:slug"
          element={
            <ResourceCardList
              handleAccessModal={handleAccessModal}
              sortOrder="desc"
              isSortByVotesActive
              onSelectedSortOrderChange={() => ''}
              resourcesError={undefined}
              resourcesLoading
              resourcesData={[]}
            />
          }
        />
      </Routes>,
      {
        initialEntries: ['/category/emptyResource'],
      }
    )

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByTestId('emptyResource')).toBeInTheDocument()
      expect(screen.queryByText('Resource Test')).not.toBeInTheDocument()
    })
  })

  it.skip('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(
      <ResourceCardList
        handleAccessModal={handleAccessModal}
        sortOrder="desc"
        isSortByVotesActive
        onSelectedSortOrderChange={() => ''}
        resourcesError={new Error('Ha habido un error...')}
        resourcesLoading
        resourcesData={[]}
      />
    )

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement

    await waitFor(() => {
      expect(spinnerComponent).toBeInTheDocument()
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
