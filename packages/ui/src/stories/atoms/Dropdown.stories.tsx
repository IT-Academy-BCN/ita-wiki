import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from '../../components/atoms/Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
  },
}

export default meta

type DropdownStory = StoryObj<typeof Dropdown>

export const Default: DropdownStory = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Dropdown {...args}>
      <p>Option 1</p>
      <p>Option 2</p>
      <p>Option 3</p>
    </Dropdown>
  ),
}

export const WithSelectedOption: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    defaultValue: 'Option 2',
  },
  render: (args) => (
    <Dropdown {...args}>
      <p>Option 1</p>
      <p>Option 2</p>
      <p>Option 3</p>
    </Dropdown>
  ),
}

export const EmptyPlaceholder: DropdownStory = {
  args: {},
  render: (args) => (
    <Dropdown {...args}>
      <p>Option 1</p>
      <p>Option 2</p>
      <p>Option 3</p>
    </Dropdown>
  ),
}

export const LongList: DropdownStory = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Dropdown {...args}>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>Option {i + 1}</p>
      ))}
    </Dropdown>
  ),
}