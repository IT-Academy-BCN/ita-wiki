import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../components/atoms'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    children: { control: 'text' },
    secondary: { control: 'boolean' },
    outline: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'normal', 'large'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type ButtonStory = StoryObj<typeof Button>

export const Primary: ButtonStory = {
  args: {
    secondary: false,
    outline: false,
    disabled: false,
  },
}

export const Secondary: ButtonStory = {
  args: {
    secondary: true,
    outline: false,
    disabled: false,
  },
}

export const Large: ButtonStory = {
  args: {
    size: 'large',
  },
}

export const Small: ButtonStory = {
  args: {
    size: 'small',
  },
}
