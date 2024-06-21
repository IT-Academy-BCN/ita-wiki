import { expect, vi } from 'vitest'
import { fireEvent, screen, waitFor, render } from '@testing-library/react'
import { VoteCounter } from '../../components/molecules'
import { colors } from '../../styles'

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

const disabledVoteCountMock = {
  voteCount: {
    downvote: 3,
    upvote: 5,
    total: 2,
    userVote: 1,
  },
  disabled: true,
}

const onClick = vi.fn()

describe('Vote counter molecule', () => {
  it('renders correctly', async () => {
    render(<VoteCounter voteCount={defaultMock.voteCount} onClick={onClick} />)

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
      <VoteCounter voteCount={positiveVotetMock.voteCount} onClick={onClick} />
    )

    const upVoteBtn = screen.getByTestId('increase')
    expect(upVoteBtn).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(upVoteBtn).toHaveStyle(`color: ${colors.success}`)
  })

  it('shows user down vote correctly', () => {
    render(
      <VoteCounter voteCount={negativeVotetMock.voteCount} onClick={onClick} />
    )

    const downVoteBtn = screen.getByTestId('decrease')
    expect(downVoteBtn).toBeInTheDocument()
    expect(screen.getByText('-5')).toBeInTheDocument()
    expect(downVoteBtn).toHaveStyle(`color: ${colors.error}`)
  })

  it('disables the buttons and sets the opacity correctly when disabled', () => {
    render(
      <VoteCounter
        voteCount={disabledVoteCountMock.voteCount}
        onClick={onClick}
        disabled={disabledVoteCountMock.disabled}
      />
    )

    const upVoteBtn = screen.getByTestId('increase')
    const downVoteBtn = screen.getByTestId('decrease')

    expect(upVoteBtn).toBeInTheDocument()
    expect(downVoteBtn).toBeInTheDocument()

    expect(upVoteBtn).toHaveStyle(`opacity: 0.4`)
    expect(downVoteBtn).toHaveStyle(`opacity: 0.4`)

    expect(upVoteBtn).toHaveStyle(`cursor: no-drop`)
    expect(downVoteBtn).toHaveStyle(`cursor: no-drop`)
  })
})
