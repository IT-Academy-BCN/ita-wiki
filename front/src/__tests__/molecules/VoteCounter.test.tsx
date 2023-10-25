import { expect, vi } from 'vitest'
import { VoteCounter } from '../../components/molecules'
import { fireEvent, screen, waitFor, render } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { queryClient } from '../setup'

// queryClient.setQueryData(['getResources'], {
//   id: 'test',
//   title: 'Resource Test',
//   description: 'Resource Test Description',
//   url: 'http://www.google.com',
//   createdAt: '2023-02-17T03:07:00',
//   updatedAt: '2023-05-17T03:07:00',
//   user: {
//     name: 'Test User Name',
//     email: 'test@mail.com',
//   },
//   voteCount: {
//     upvote: 0,
//     downvote: 0,
//     total: 1,
//     userVote: 0,
//   },
// })

// const queryData = queryClient.getQueryData(['getResources'])
// console.log(queryData.voteCount)

const user = {
  name: 'Hola',
  avatar: 'Adios',
}

const voteCount = {
  upvote: 0,
  downvote: 0,
  total: 0,
  userVote: 0,
}

// const useMutationMock = vi.fn(() => ({
//   mutate: vi.fn(),
//   onSuccess: vi.fn(),
//   onError: vi.fn(),
// }))

// vi.mock('@tanstack/react-query', async () => {
//   const actual: Record<number, unknown> = await vi.importActual(
//     '@tanstack/react-query'
//   )
//   return {
//     ...actual,
//     useMutation: () => useMutationMock,
//   }
// })

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
        voteCount={voteCount}
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
        voteCount={voteCount}
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

  it.only('can vote when the user is logged in', async () => {
    const handleAccessModal = vi.fn()
    vi.mocked(useAuth).mockReturnValue({
      user,
    } as TAuthContext)

    render(
      <VoteCounter
        voteCount={voteCount}
        resourceId="test"
        handleAccessModal={handleAccessModal}
      />
    )

    const upvoteBtn = screen.getByTestId('increase')
    expect(upvoteBtn).toBeInTheDocument()
    fireEvent.click(upvoteBtn)

    // CHECK IF PUT REQUEST IS BEING MADE
  
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })
})
