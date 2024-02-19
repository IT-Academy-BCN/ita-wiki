import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../../../components/atoms/Avatar'
import customAvatar from './custom.svg'

const avatarCssForDoc = {
  borderRadius: '20%',
  backgroundColor: '#000',
}
const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    src: { control: 'text' },
    alt: {
      control: { type: 'select' },
      type: 'string',
      options: ['Sin imagen de usuario', 'user name'],
    },
    avatarCss: {
      control: 'object',
    },
    mediaQuery: {
      control: 'object',
    },
    onClick: { action: 'clicked' },
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
export const WithCssProps: Story = {
  args: {
    avatarCss: avatarCssForDoc

  },
}

