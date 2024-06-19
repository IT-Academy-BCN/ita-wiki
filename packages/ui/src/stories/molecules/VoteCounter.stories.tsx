import type { Meta, StoryObj } from '@storybook/react'
import { FC, useState } from 'react'
import {
  VoteCounter,
  type TVoteCount,
  type TVoteCounter,
} from '../../components/molecules'

const MockedVoteCounter: FC<TVoteCounter> = ({ voteCount, disabled }) => {
  const [voteCountUpdated, setVoteCountUpdated] =
    useState<TVoteCount>(voteCount)

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
    }
  }

  return (
    <VoteCounter
      voteCount={voteCountUpdated}
      onClick={onVote}
      disabled={disabled}
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
    disabled: { control: 'boolean' },
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

export const Disabled: VoteCounterStory = {
  args: {
    voteCount: {
      downvote: 8,
      upvote: 2,
      total: 8,
      userVote: 0,
    },
    disabled: true,
  },
}
