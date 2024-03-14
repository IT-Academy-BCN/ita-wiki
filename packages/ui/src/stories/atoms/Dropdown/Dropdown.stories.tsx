import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from '../../../components/atoms/Dropdown'
import  angular  from './angular.svg'

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
    options: [
      {
        id: { control: 'text' },
        name: { control: 'text' },
        icon: { control: 'text' },
        iconSvg: { control: 'text' },
      },
    ],
  },
}

export default meta

type DropdownStory = StoryObj<typeof Dropdown>

export const Default: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
    ],
  },
  render: (args) => <Dropdown {...args} />,
}

export const WithSelectedOption: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    defaultValue: 'id',
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
    ],
  },
  render: (args) => <Dropdown {...args} />,
}

export const EmptyPlaceholder: DropdownStory = {
  args: {
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
    ],
  },
  render: (args) => <Dropdown {...args} />,
}

export const LongList: DropdownStory = {
  args: {
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
      {
        id: '3',
        name: 'Option 3',
      },
      {
        id: '4',
        name: 'Option 4',
      },
      {
        id: '5',
        name: 'Option 5',
      },
      {
        id: '6',
        name: 'Option 6',
      },
      {
        id: '7',
        name: 'Option 7',
      },
      {
        id: '8',
        name: 'Option 8',
      },
      {
        id: '9',
        name: 'Option 9',
      },
      {
        id: '10',
        name: 'Option 10',
      },
    ],
  },
  render: (args) => <Dropdown {...args} />,
}

export const WithIcon: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    options: [
      {
        id: '1',
        name: 'Option 1',
        icon: 'expand_less',
      },
      {
        id: '2',
        name: 'Option 2',
        icon: 'expand_more',
      },
    ],
  },
  render: (args) => <Dropdown {...args} />,
}

export const WithImg: DropdownStory = {
  args: {
    placeholder: 'Select an option',
    options: [
      {
        id: '1',
        name: 'Option 1',
        iconSvg: angular,
      },
      {
        id: '2',
        name: 'Option 2',
        iconSvg: angular,
      },
    ],
  },
  render: (args) => <Dropdown {...args} />,
}
