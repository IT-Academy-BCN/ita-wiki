import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from '../../components/atoms'

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'big'],
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type SpinnerStory = StoryObj<typeof meta>

export const Default: SpinnerStory = {}

export const ExtraSmall: SpinnerStory = {
  args: {
    size: 'xsmall',
  },
}

export const Small: SpinnerStory = {
  args: {
    size: 'small',
  },
}

export const Medium: SpinnerStory = {
  args: {
    size: 'medium',
  },
}

export const Big: SpinnerStory = {
  args: {
    size: 'big',
  },
}
