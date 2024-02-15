import type { Meta, StoryObj } from '@storybook/react'
import { VoteCounter } from '../../components/molecules'

const meta = {
  title: 'Molecules/VoteCounter',
  component: VoteCounter,
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
      downvote: 0,
      upvote: 1,
      total: 1,
      userVote: 0,
    },
  },
}

export const VoteDown: VoteCounterStory = {
  args: {
    voteCount: {
      downvote: 1,
      upvote: 0,
      total: -1,
      userVote: 0,
    },
  },
}
