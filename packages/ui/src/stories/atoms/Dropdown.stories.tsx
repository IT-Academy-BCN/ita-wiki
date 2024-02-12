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
  },
}

export default meta

type DropdownStory = StoryObj<typeof Dropdown>

export const Default: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    children: (
      <>
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
      </>
    ),
  },
}

export const WithSelectedOption: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    defaultValue: 'Option 2',
    children: (
      <>
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
      </>
    ),
  },
}

export const EmptyPlaceholder: DropdownStory = {
  args: {
    children: (
      <>
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
      </>
    ),
  },
}

export const LongList: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    children: (
      <>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Option {i + 1}</p>
        ))}
      </>
    ),
  },
}
