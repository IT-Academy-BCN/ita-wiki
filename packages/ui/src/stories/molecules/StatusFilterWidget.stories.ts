import type { Meta, StoryObj } from '@storybook/react'
import { StatusFilterWidget } from '../../components/molecules'

const meta = {
  title: 'Molecules/StatusFilterWidget',
  component: StatusFilterWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    handleStatusFilter: { action: 'clicked' },
    statusName: { control: 'text' },
    labelForSeen: { control: 'text' },
    labelForNotSeen: { control: 'text' },
  },
} satisfies Meta<typeof StatusFilterWidget>

export default meta
type StatusFilterWidgetStory = StoryObj<typeof meta>

export const Default: StatusFilterWidgetStory = {
  args: {
    statusName: 'Status',
    labelForSeen: 'Seen',
    labelForNotSeen: 'Not seen',
  },
}
