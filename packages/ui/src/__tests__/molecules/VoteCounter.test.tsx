import { expect, vi } from 'vitest'
import { fireEvent, screen, waitFor, render } from '@testing-library/react'
import { VoteCounter } from '../../components/molecules'
import { colors } from '../../styles'
import userEvent from '@testing-library/user-event'

const defaultMock = {
  voteCount: {
    upvote: 0,
    downvote: 0,
    total: 0,
    userVote: 0,
  },
}

const positiveVotetMock = {
  voteCount: {
    upvote: 6,
    downvote: 1,
    total: 5,
    userVote: 1,
  },
}

const negativeVotetMock = {
  voteCount: {
    upvote: 6,
    downvote: 11,
    total: -5,
    userVote: -1,
  },
}

const onClick = vi.fn()

describe('Vote counter molecule', () => {
  it('renders correctly', async () => {
    render(<VoteCounter voteCount={defaultMock.voteCount} onClick={onClick} disabled={false} />)

    const upVoteBtn = screen.getByTestId('increase')
    expect(upVoteBtn).toBeInTheDocument()
    expect(screen.getByTestId('decrease')).toBeInTheDocument()
    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()

    fireEvent.click(upVoteBtn)
    await waitFor(() => {
      expect(onClick).toHaveBeenCalled()
    })
  })

  it('shows user up vote correctly', () => {
    render(
      <VoteCounter voteCount={positiveVotetMock.voteCount} onClick={onClick} disabled={false} />
    )

    const upVoteBtn = screen.getByTestId('increase')
    expect(upVoteBtn).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(upVoteBtn).toHaveStyle(`color: ${colors.success}`)
    expect(upVoteBtn).not.toBeDisabled()
  })

  it('shows user down vote correctly', () => {
    render(
      <VoteCounter voteCount={negativeVotetMock.voteCount} onClick={onClick}  disabled={false} />
    )

    const downVoteBtn = screen.getByTestId('decrease')
    expect(downVoteBtn).toBeInTheDocument()
    expect(screen.getByText('-5')).toBeInTheDocument()
    expect(downVoteBtn).toHaveStyle(`color: ${colors.error}`)
    expect(downVoteBtn).not.toBeDisabled()
  })

  it.only('disables buttons when disabled prop is true', () => {
    render(
      <VoteCounter voteCount={negativeVotetMock.voteCount} onClick={onClick} disabled={true} />
    )

    const upVoteBtn = screen.getByTestId('increase')
    const downVoteBtn = screen.getByTestId('decrease')

    expect(upVoteBtn).toBeDisabled()
    expect(downVoteBtn).toBeDisabled()

    fireEvent.click(upVoteBtn)
    fireEvent.click(downVoteBtn)

    expect(onClick).not.toHaveBeenCalled()
  })
})
