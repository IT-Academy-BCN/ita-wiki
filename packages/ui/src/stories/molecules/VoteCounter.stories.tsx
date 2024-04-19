import type { Meta, StoryObj } from '@storybook/react'
import { FC, useState } from 'react'
import {
  VoteCounter,
  type TVoteCount,
  type TVoteCounter,
} from '../../components/molecules'

const MockedVoteCounter: FC<TVoteCounter> = ({
  voteCount,
  disabledUp,
  disabledDown,
}) => {
  const [voteCountUpdated, setVoteCountUpdated] =
    useState<TVoteCount>(voteCount)
  const [isUpVoteDisabled, setIsUpVoteDisabled] = useState(false)
  const [isDownVoteDisabled, setIsDownVoteDisabled] = useState(false)

  const onVote = (vote: 'up' | 'down') => {
    if (
      (vote === 'up' && voteCountUpdated.userVote !== 1) ||
      (vote === 'down' && voteCountUpdated.userVote === -1)
    ) {
      const newVoteUp = {
        ...voteCountUpdated,
        total: voteCountUpdated.total + 1,
        userVote: voteCountUpdated.userVote + 1,
      }
      setVoteCountUpdated(newVoteUp)
      setIsUpVoteDisabled(true)
      setTimeout(() => {
        setIsUpVoteDisabled(false)
      }, 1000)
    }
    if (
      (vote === 'up' && voteCountUpdated.userVote === 1) ||
      (vote === 'down' && voteCountUpdated.userVote !== -1)
    ) {
      const newVoteDown = {
        ...voteCountUpdated,
        total: voteCountUpdated.total - 1,
        userVote: voteCountUpdated.userVote - 1,
      }
      setVoteCountUpdated(newVoteDown)
      setIsDownVoteDisabled(true)
      setTimeout(() => {
        setIsDownVoteDisabled(false)
      }, 1000)
    }
  }

  return (
    <VoteCounter
      voteCount={voteCountUpdated}
      onClick={onVote}
      disabledUp={disabledUp && isUpVoteDisabled}
      disabledDown={disabledDown && isDownVoteDisabled}
    />
  )
}

const meta = {
  title: 'Molecules/VoteCounter',
  component: MockedVoteCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    voteCount: {
      downvote: { control: 'number' },
      upvote: { control: 'number' },
      total: { control: 'number' },
      userVote: { control: 'number' },
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof VoteCounter>

export default meta
type VoteCounterStory = StoryObj<typeof VoteCounter>

export const Default: VoteCounterStory = {
  args: {
    voteCount: {
      downvote: 0,
      upvote: 0,
      total: 0,
      userVote: 0,
    },
  },
}

export const VoteUp: VoteCounterStory = {
  args: {
    voteCount: {
      downvote: 1,
      upvote: 11,
      total: 10,
      userVote: 1,
    },
  },
}

export const VoteDown: VoteCounterStory = {
  args: {
    voteCount: {
      downvote: 3,
      upvote: 8,
      total: 5,
      userVote: -1,
    },
  },
}

export const VoteDisabled: VoteCounterStory = {
  args: {
    disabledUp: true,
    disabledDown: true,
    voteCount: {
      downvote: 0,
      upvote: 0,
      total: 0,
      userVote: 0,
    },
  },
}
