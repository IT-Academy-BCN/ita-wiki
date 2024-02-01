import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '../../components/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    options: [
      {
        id: { control: 'text' },
        label: { control: 'text' },
        value: { control: 'text' },
      },
    ],
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    error: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    options: [
      { id: 'option1', label: 'Option 1', value: 'Option 1' },
      { id: 'option2', label: 'Option 2', value: 'Option 2' },
      { id: 'option3', label: 'Option 3', value: 'Option 3' },
    ],
  },
}

export const WithPlaceholder: Story = {
  args: {
    options: [
      { id: 'option1', label: 'Option 1', value: 'Option 1' },
      { id: 'option2', label: 'Option 2', value: 'Option 2' },
      { id: 'option3', label: 'Option 3', value: 'Option 3' },
    ],
    placeholder: 'Select an option',
  },
}

export const DefaultValueProvided: Story = {
  args: {
    options: [
      { id: 'option1', label: 'Option 1', value: 'Option 1' },
      { id: 'option2', label: 'Option 2', value: 'Option 2' },
      { id: 'option3', label: 'Option 3', value: 'Option 3' },
    ],
    defaultValue: 'Option 1',
    placeholder: 'Select an option',
  },
}

export const WithError: Story = {
  args: {
    options: [
      { id: 'option1', label: 'Option 1', value: 'Option 1' },
      { id: 'option2', label: 'Option 2', value: 'Option 2' },
      { id: 'option3', label: 'Option 3', value: 'Option 3' },
    ],
    placeholder: 'Select an option',
    error: true,
  },
}
