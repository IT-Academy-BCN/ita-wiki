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
    children: { control: 'object' },
  },
}

export default meta

type DropdownStory = StoryObj<typeof Dropdown>

export const Default: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    children: [<p>Option 1</p>, <p>Option 2</p>, <p>Option 3</p>],
  },
  render: (args) => <Dropdown {...args} />,
}

export const WithSelectedOption: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    defaultValue: 'Option 2',
    children: [<p>Option 1</p>, <p>Option 2</p>, <p>Option 3</p>],
  },
  render: (args) => <Dropdown {...args} />,
}

export const EmptyPlaceholder: DropdownStory = {
  args: {
    children: [<p>Option 1</p>, <p>Option 2</p>, <p>Option 3</p>],
  },
  render: (args) => <Dropdown {...args} />,
}

export const LongList: DropdownStory = {
  args: {
    children: [
      <p>Option 1</p>,
      <p>Option 2</p>,
      <p>Option 3</p>,
      <p>Option 4</p>,
      <p>Option 5</p>,
      <p>Option 6</p>,
      <p>Option 7</p>,
      <p>Option 8</p>,
      <p>Option 9</p>,
      <p>Option 10</p>,
      <p>Option 11</p>,
      <p>Option 12</p>,
      <p>Option 13</p>,
      <p>Option 14</p>,
      <p>Option 15</p>,
    ],
  },
  render: (args) => <Dropdown {...args} />,
}
