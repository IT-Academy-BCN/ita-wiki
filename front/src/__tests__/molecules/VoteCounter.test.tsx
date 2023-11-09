import { vi } from 'vitest'
import { VoteCounter } from '../../components/molecules'
import { fireEvent, screen, waitFor, render } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const user = {
  name: 'Hola',
  avatar: 'Adios',
}
vi.mock('../../context/AuthProvider', async () => {
  const actual = (await vi.importActual(
    '../../context/AuthProvider'
  )) as typeof import('../../context/AuthProvider')
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      user: null,
    })),
  }
})

describe('Vote counter molecule', () => {
  it('renders correctly', () => {
    const handleAccessModal = vi.fn()
    render(
      <VoteCounter
        totalVotes={0}
        resourceId="test"
        handleAccessModal={handleAccessModal}
      />
    )
    expect(screen.getByTestId('increase')).toBeInTheDocument()
    expect(screen.getByTestId('decrease')).toBeInTheDocument()
    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('user not logged in can not vote', async () => {
    const handleAccessModal = vi.fn()
    render(
      <VoteCounter
        totalVotes={0}
        resourceId="test"
        handleAccessModal={handleAccessModal}
      />
    )

    const upvoteBtn = screen.getByTestId('increase')
    fireEvent.click(upvoteBtn)
    await waitFor(() => {
      expect(handleAccessModal).toHaveBeenCalled()
    })
  })

  it('can vote when the user is logged in', async () => {
    const handleAccessModal = vi.fn()
    vi.mocked(useAuth).mockReturnValue({
      user,
    } as TAuthContext)

    render(
      <VoteCounter
        totalVotes={0}
        resourceId="test"
        handleAccessModal={handleAccessModal}
      />
    )

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.queryByText('1')).not.toBeInTheDocument()

    const upvoteBtn = screen.getByTestId('increase')
    expect(upvoteBtn).toBeInTheDocument()
    fireEvent.click(upvoteBtn)

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    expect(upvoteBtn).toHaveStyle('color: #27AE60')
  })
})
