import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from '../../components/atoms/Checkbox'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: { control: 'checkbox' },
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    hiddenLabel: { control: 'boolean', defaultValue: false },
    defaultChecked: { control: 'boolean', defaultValue: false },
    required: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    id: 'checkboxId',
    label: 'A checkbox',
  },
}

export const DefaultChecked: Story = {
  args: {
    id: 'checkedCheckboxId',
    label: 'A checked by default checkbox',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabledCheckboxId',
    label: 'A disabled checkbox',
    disabled: true,
  },
}
