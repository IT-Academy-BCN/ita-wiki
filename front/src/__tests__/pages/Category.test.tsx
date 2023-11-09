import { expect, vi } from 'vitest'
import { render, renderHook, screen, fireEvent, waitFor } from '../test-utils'
import { Category } from '../../pages'
import { useSortByDate } from '../../hooks/useSortByDate'
import { useSortByVotes } from '../../hooks/useSortByVotes'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { FiltersProvider } from '../../context/store/context'

vi.mock('react-router-dom', async () => {
  const actual: Record<number, unknown> = await vi.importActual(
    'react-router-dom'
  )
  return {
    ...actual,
    useParams: () => ({ categoryId: 1 }),
  }
})

beforeEach(() => {
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'Name',
      avatar: 'Avatar',
    },
  } as TAuthContext)
})

describe.skip('Resource', () => {
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
})

it('renders correctly', () => {
  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  expect(screen.getByTestId('filters-container')).toBeInTheDocument()
  expect(screen.getByTestId('types-filter')).toBeInTheDocument()
  expect(screen.getByTestId('status-filter')).toBeInTheDocument()
  expect(screen.getByTestId('resource-list')).toBeInTheDocument()
  expect(screen.getByText('Mis recursos')).toBeInTheDocument()
  expect(screen.getByText('Recursos favorits')).toBeInTheDocument()
})

it('renders Navbar for logged in users', () => {
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'Name',
      avatar: 'Avatar',
    },
  } as TAuthContext)

  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  expect(screen.getByTestId('navbar')).toBeInTheDocument()
})

it('renders Navbar for unregistered users', () => {
  vi.mocked(useAuth).mockReturnValue({
    user: null,
  } as TAuthContext)

  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  expect(screen.getByTestId('navbar')).toBeInTheDocument()
})

it('filters opens and closes correctly', () => {
  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  fireEvent.click(screen.getByTestId('filters-button'))
  expect(screen.getByTestId('mobile-filters')).toBeInTheDocument()

  fireEvent.click(screen.getByTestId('close-filters-button'))
  expect(screen.queryByTestId('mobile-filters')).not.toBeInTheDocument()
})

it('create new resource modal opens and closes correctly', () => {
  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  fireEvent.click(screen.getByText('+ Crear nuevo recurso'))
  expect(screen.getByText(/Nuevo Recurso/)).toBeInTheDocument()
})

it('modal opens and closes correctly when user is not logged', async () => {
  vi.mocked(useAuth).mockReturnValue({
    user: null,
  } as TAuthContext)

  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  fireEvent.click(screen.getByRole('button', { name: '+ Crear nuevo recurso' }))
  const modalTitle = screen.getByRole('heading', {
    name: /acceso restringido/i,
  })

  expect(modalTitle).toBeInTheDocument()
  fireEvent.keyDown(document, { key: 'Escape' })
  await waitFor(() => {
    expect(modalTitle).not.toBeInTheDocument()
  })
})

it('modal opens and closes correctly when user is logged', async () => {
  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  fireEvent.click(screen.getByRole('button', { name: '+ Crear nuevo recurso' }))
  const modalTitle = screen.getByRole('heading', {
    name: /nuevo recurso/i,
  })
  expect(modalTitle).toBeInTheDocument()
  fireEvent.keyDown(document, { key: 'Escape' })
  await waitFor(() => {
    expect(modalTitle).not.toBeInTheDocument()
  })
})

it('status filter widget does not appear for users who are not logged in', () => {
  vi.mocked(useAuth).mockReturnValue({
    user: null,
  } as TAuthContext)
  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  const statusFilterWidget = screen.queryByTestId('status-filter')
  expect(statusFilterWidget).not.toBeInTheDocument()
})

it('status filter widget appears for users who are logged in', () => {
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'Name',
      avatar: 'Avatar',
    },
  } as TAuthContext)
  render(
    <FiltersProvider>
      <Category />
    </FiltersProvider>
  )

  const statusFilterWidget = screen.getByTestId('status-filter')
  expect(statusFilterWidget).toBeInTheDocument()
})

it('sorts resources by date in descending order', () => {
  const items = [
    { id: 1, date: '2023-11-01' },
    { id: 2, date: '2023-10-30' },
    { id: 3, date: '2023-10-28' },
  ]

  render(<Category />)

  fireEvent.click(screen.getByText('Fecha'))

  const { result } = renderHook(() => useSortByDate(items, 'date', 'desc'))

  expect(result.current.sortedItems).toEqual([
    { id: 1, date: '2023-11-01' },
    { id: 2, date: '2023-10-30' },
    { id: 3, date: '2023-10-28' },
  ])
})

it('sorts resources by votes in ascending order', () => {
  const votes = [
    {
      id: 'resource1',
      title: 'Resource 1',
      voteCount: {
        downvote: 1,
        upvote: 2,
        total: 3,
        userVote: 1,
      },
    },
    {
      id: 'resource2',
      title: 'Resource 2',
      voteCount: {
        downvote: 0,
        upvote: 0,
        total: 0,
        userVote: 0,
      },
    },
    {
      id: 'resource3',
      title: 'Resource 3',
      voteCount: {
        downvote: 0,
        upvote: 0,
        total: 7,
        userVote: 0,
      },
    },
  ]

  render(<Category />)

  fireEvent.click(screen.getByText('Votos'))

  const { result } = renderHook(() => useSortByVotes(votes, 'asc'))
  const sortedResources = result.current.sortedVotes

  const voteCounts = sortedResources.map((vote) => vote.voteCount.total)

  expect(voteCounts).toEqual([0, 3, 7])
})

it('changes Votos and Fecha styles on click', () => {
  render(<Category />)

  const sortVotesButton = screen.getByText('Votos')
  const sortDatesButton = screen.getByText('Fecha')

  fireEvent.click(sortVotesButton)

  expect(screen.getByText('Votos')).toHaveStyle('font-weight: bold')

  fireEvent.click(sortDatesButton)

  expect(screen.getByText('Fecha')).toHaveStyle('font-weight: bold')
})
