import { expect, vi } from 'vitest'
import { VoteCounter } from '../../components/molecules'
import { fireEvent, screen, waitFor, render } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { queryClient } from '../setup'
import { TResource } from '../../types'

const user = {
  name: 'Hola',
  avatar: 'Adios',
}

const resourceMock = {
  id: 'test',
  title: 'prueba1234',
  slug: 'prueba1234',
  description: 'prueba1234',
  url: 'https://blog.webdevsimplified.com/2022-01/intersection-observer/',
  resourceType: 'VIDEO',
  createdAt: '2023-09-27T10:39:52.456Z',
  updatedAt: '2023-10-11T13:53:29.117Z',
  user: {
    name: 'Vincenzo',
  },
  topics: [
    {
      topic: {
        id: 'cln1f3xo80014s6wviaw9m5zx',
        name: 'JSX',
        slug: 'jsx',
        categoryId: 'cln1er1vn000008mk79bs02c5',
        createdAt: '2023-09-27T07:21:23.768Z',
        updatedAt: '2023-09-27T07:21:23.768Z',
      },
    },
  ],
  voteCount: {
    upvote: 0,
    downvote: 0,
    total: 0,
    userVote: 0,
  },
  isFavorite: false,
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
  afterEach(() => {
    queryClient.clear()
  })
  it('renders correctly', () => {
    const handleAccessModal = vi.fn()
    render(
      <VoteCounter
        voteCount={resourceMock.voteCount}
        resourceId={resourceMock.id}
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
    queryClient.setQueryData(['getResources'], [resourceMock])
    render(
      <VoteCounter
        voteCount={resourceMock.voteCount}
        resourceId={resourceMock.id}
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
    queryClient.setQueryData(['getResources'], [resourceMock])
    const queryData = queryClient.getQueryData(['getResources']) as TResource[]

    const { rerender } = render(
      <VoteCounter
        voteCount={queryData[0].voteCount}
        resourceId={resourceMock.id}
        handleAccessModal={handleAccessModal}
      />
    )

    const upvoteBtn = screen.getByTestId('increase')
    const downvoteBtn = screen.getByTestId('decrease')
    expect(upvoteBtn).toBeInTheDocument()
    expect(downvoteBtn).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()

    // CHECK IF PUT REQUEST IS BEING MADE
    fireEvent.click(upvoteBtn)
    await waitFor(() => {
      const queryDataUpdated = queryClient.getQueryData([
        'getResources',
      ]) as TResource[]

      rerender(
        <VoteCounter
          voteCount={queryDataUpdated[0].voteCount}
          resourceId={resourceMock.id}
          handleAccessModal={handleAccessModal}
        />
      )
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })
})
