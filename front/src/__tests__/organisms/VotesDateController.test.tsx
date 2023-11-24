import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { VotesDateController } from '../../components/organisms'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const mockHandleSortOrder = vi.fn()
const mockHandleSortByVotes = vi.fn()
const mockHandleSortByDates = vi.fn()

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
    },
  } as TAuthContext)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('VotesDate component', () => {
  it('does not render when there are no resources', () => {
    render(<VotesDateController
      sortOrder='desc'
      filters={{ slug: '', resourceTypes: [], status: [] }}
      handleSortOrder={mockHandleSortOrder}
      handleSortByVotes={mockHandleSortByVotes}
      handleSortByDates={mockHandleSortByDates}
    />)
  
    expect(screen.queryByText(/vots/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument()
  })

  it('changes Votos and Fecha styles on click', async () => {
    render(
      <VotesDateController
        sortOrder='desc'
        filters={{ slug: 'resourceTest', resourceTypes: ['type1', 'type2'], status: [] }}
        handleSortOrder={mockHandleSortOrder}
        handleSortByVotes={mockHandleSortByVotes}
        handleSortByDates={mockHandleSortByDates}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/vots/i)).toBeInTheDocument()
      expect(screen.getByText(/data/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText(/vots/i))

    expect(screen.getByText(/vots/i)).toHaveStyle('font-weight: bold')
    expect(screen.getByText(/data/i)).toHaveStyle('font-weight: normal')
    expect(mockHandleSortByVotes).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByText(/Data/i))

    expect(screen.getByText(/data/i)).toHaveStyle('font-weight: bold')
    expect(screen.getByText(/vots/i)).toHaveStyle('font-weight: normal')
    expect(mockHandleSortByDates).toHaveBeenCalledTimes(1)
  })
})
