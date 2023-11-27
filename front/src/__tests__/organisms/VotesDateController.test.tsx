import { vi } from 'vitest'
import { render, screen, fireEvent } from '../test-utils'
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
  it('changes Votos and Fecha styles on click', () => {
    render(
      <VotesDateController
        sortOrder='desc'
        handleSortOrder={mockHandleSortOrder}
        handleSortByVotes={mockHandleSortByVotes}
        handleSortByDates={mockHandleSortByDates}
      />
    )

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
