import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../../../components/atoms/Avatar'
import customAvatar from './custom.svg'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    src: { control: 'text' },
    height: { control: 'number' },
    width: { control: 'number' },
    alt: {
      control: { type: 'select' },
      type: 'string',
      options: ['Sin imagen de usuario', 'user name'],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    alt: 'user name',
  },
}
export const WithAvatar: Story = {
  args: {
    src: customAvatar,
  },
}

