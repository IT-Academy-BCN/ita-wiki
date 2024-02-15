import { expect, vi } from 'vitest'
import { fireEvent, screen, waitFor, render } from '@testing-library/react'
import { VoteCounter } from '../../components/molecules'

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

const onClick = vi.fn()

describe('Vote counter molecule', () => {
  it('renders correctly', () => {
    render(<VoteCounter voteCount={resourceMock.voteCount} onClick={onClick} />)
    expect(screen.getByTestId('increase')).toBeInTheDocument()
    expect(screen.getByTestId('decrease')).toBeInTheDocument()
    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('user not logged in can not vote', async () => {
    render(<VoteCounter voteCount={resourceMock.voteCount} onClick={onClick} />)

    const upvoteBtn = screen.getByTestId('increase')
    fireEvent.click(upvoteBtn)
    await waitFor(() => {
      expect(onClick).toHaveBeenCalled()
    })
  })
})
