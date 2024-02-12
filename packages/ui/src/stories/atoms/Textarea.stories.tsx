import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '../../components/atoms'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    success: { control: 'boolean', defaultValue: false },
    warning: { control: 'boolean', defaultValue: false },
    error: { control: 'boolean', defaultValue: false },
    cols: { control: 'number' },
    rows: { control: 'number' },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    defaultValue: 'Lorem ipsum...',
  },
}
export const Success: Story = {
  args: {
    defaultValue: 'Lorem success...',
    success: true,
  },
}
export const Warning: Story = {
  args: {
    defaultValue: 'Lorem warning...',
    warning: true,
  },
}
export const Error: Story = {
  args: {
    defaultValue: 'Lorem error...',
    error: true,
  },
}
