import type { Meta, StoryObj } from '@storybook/react'
import { ValidationMessage } from '../../components/atoms'

const meta = {
  title: 'Atoms/ValidationMessage',
  component: ValidationMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    color: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning'],
    },
  },
} satisfies Meta<typeof ValidationMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Validation Message',
    color: 'success',
  },
}

export const ErrorMessage: Story = {
  args: {
    text: 'Error Message',
    color: 'error',
  },
}

export const WarningMessage: Story = {
  args: {
    text: 'Warning Message',
    color: 'warning',
  },
}
