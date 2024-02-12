import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../../components/atoms'

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fontWeight: { options: ['normal', 'bold'], control: { type: 'select' } },
    fontSize: { control: 'text' },
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
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    label: 'Text',
    children: 'Lorem ipsum...',
  },
}
