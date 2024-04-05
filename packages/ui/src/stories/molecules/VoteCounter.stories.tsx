import type { Meta, StoryObj } from '@storybook/react'
import { FC, useState } from 'react'
import {
  VoteCounter,
  type TVoteCount,
  type TVoteCounter,
} from '../../components/molecules'

const MockedVoteCounter: FC<TVoteCounter> = ({ voteCount }) => {
  const [voteCountUpdated, setVoteCountUpdated] =
  useState<TVoteCount>(voteCount)
  
  const onVote = (vote: 'up' | 'down') => {
    let newTotal: number
    let newUserVote: number

    if (vote === 'up') {
        newTotal = voteCountUpdated.total + 1
        newUserVote = voteCountUpdated.userVote + 1
      }else if(vote === 'down') {
        newTotal = voteCountUpdated.total - 1;
        newUserVote = voteCountUpdated.userVote - 1
      }else {
        return
      }
      
      const newVoteCount: TVoteCount = {
        ...voteCountUpdated,
        total: newTotal,
        userVote: newUserVote,
      }

      setVoteCountUpdated(newVoteCount)
  }

  return <VoteCounter voteCount={voteCountUpdated} onClick={onVote} />
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
