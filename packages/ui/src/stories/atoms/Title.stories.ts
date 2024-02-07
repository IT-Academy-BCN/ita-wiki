import type { Meta, StoryObj } from '@storybook/react'
import { Title } from '../../components/atoms'

const meta = {
  title: 'Atoms/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
    fontWeight: {
      options: ['normal', 'bold'],
      control: { type: 'select' },
    },
    color: { control: 'color' },
    fontFamily: {
      options: [
        'Poppins',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'Liberation Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof Title>

export const Default: Story = {
  args: {
    label: 'Title',
    children: 'Title Lorem ipsum...',
  },
}
