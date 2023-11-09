import { vi } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import { render, screen, waitFor } from '../test-utils'
import { ResourceCardList } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { FiltersProvider } from '../../context/store/context'

describe('ResourceCardList', () => {
  const handleAccessModal = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders ResourceCard correctly on success', async () => {
    render(
      <FiltersProvider>
        <Routes>
          <Route
            path="/category/:slug"
            element={
              <ResourceCardList
                handleAccessModal={handleAccessModal}
                sortOrder="desc"
                handleSortByVotes={() => 'desc'}
                handleSortByDates={() => 'desc'}
                isSortByVotesActive
              />
            }
          />
        </Routes>
      </FiltersProvider>,
      {
        initialEntries: ['/category/resourceTest'],
      }
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Resource Test')).toBeInTheDocument()
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        'http://www.google.com'
      )
      expect(screen.queryByTestId('emptyResource')).not.toBeInTheDocument()
    })
  })

  it('renders message when Category does not have Resources', async () => {
    render(
      <FiltersProvider>
        <Routes>
          <Route
            path="/category/:slug"
            element={
              <ResourceCardList
                handleAccessModal={handleAccessModal}
                sortOrder="desc"
                handleSortByVotes={() => 'desc'}
                handleSortByDates={() => 'desc'}
                isSortByVotesActive
              />
            }
          />
        </Routes>
      </FiltersProvider>,
      {
        initialEntries: ['/category/emptyResource'],
      }
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByTestId('emptyResource')).toBeInTheDocument()
      expect(screen.queryByText('Resource Test')).not.toBeInTheDocument()
    })
  })

  it.skip('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(
      <FiltersProvider>
        <ResourceCardList
          handleAccessModal={handleAccessModal}
          sortOrder="desc"
          handleSortByVotes={() => 'desc'}
          handleSortByDates={() => 'desc'}
          isSortByVotesActive
        />
      </FiltersProvider>
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => {
      expect(spinnerComponent).toBeInTheDocument()
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
