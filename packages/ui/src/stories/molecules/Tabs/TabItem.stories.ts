import type { Meta, StoryObj } from '@storybook/react'
import TabItem from '../../../components/molecules/Tabs/TabItem'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/TabItem',
  component: TabItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    title: { control: 'text' },
    isActive: { control: 'boolean' },
    index: { control: 'number' },
  },
} satisfies Meta<typeof TabItem>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Tab Item',
    index: 0,
    isActive: false,
  },
}

export const Active: Story = {
  args: {
    title: 'Active Tab Item',
    index: 0,
    isActive: true,
  },
}
