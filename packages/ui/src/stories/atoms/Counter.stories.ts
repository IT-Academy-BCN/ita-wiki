import type { Meta, StoryObj } from '@storybook/react'

import { Counter } from '../../components/atoms'

const meta = {
  title: 'Atoms/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    number: { control: 'number' },
    text: { control: 'text' },
    icon: { control: 'text' },
    isError: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
} satisfies Meta<typeof Counter>

export default meta
type CounterStory = StoryObj<typeof meta>

export const Default: CounterStory = {
  args: {
    number: 0,
    text: 'Counter Default',
    icon: 'expand_less',
    isError: false,
    errorMessage: 'n/a',
  },
}

export const Error: CounterStory = {
  args: {
    number: undefined,
    text: 'Counter Error',
    icon: 'expand_less',
    isError: true,
    errorMessage: 'n/a',
  },
}

export const Loading: CounterStory = {
  args: {
    number: undefined,
    text: 'Counter Loading',
    icon: 'expand_less',
    isError: false,
    errorMessage: 'n/a',
  },
}
