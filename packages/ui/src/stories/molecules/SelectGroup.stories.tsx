import type { Meta, StoryObj } from '@storybook/react'
import { SelectGroup } from '../../components/molecules'

const storyOptions = [
  { id: 'option1', label: 'Option 1', value: 'Option 1' },
  { id: 'option2', label: 'Option 2', value: 'Option 2' },
  { id: 'option3', label: 'Option 3', value: 'Option 3' },
]

const storyOptionsWithIcon = [
  { id: 'option1', label: 'Option 1', value: 'Option 1', iconSvg: 'icon' },
  { id: 'option2', label: 'Option 2', value: 'Option 2', iconSvg: 'icon' },
  { id: 'option3', label: 'Option 3', value: 'Option 3', iconSvg: 'icon' },
]

const meta = {
  title: 'Molecules/SelectGroup',
  component: SelectGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: [
      {
        id: { control: 'text' },
        name: { control: 'text' },
        label: { control: 'text' },
        value: { control: 'text' },
      },
    ],
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    $error: { control: 'boolean' },
    hiddenLabel: { control: 'boolean' },
    validationMessage: { control: 'text' },
  },
} satisfies Meta<typeof SelectGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: storyOptions,
    id: 'default',
    name: 'default',
    label: 'Default SelectGroup',
  },
}

export const WithValidationMessage: Story = {
  args: {
    id: 'message',
    name: 'message',
    label: 'With Validation Message SelectGroup',
    placeholder: 'Select an option',
    options: storyOptions,
    $error: true,
    validationMessage: 'Error validation message',
  },
}

export const HiddenLabel: Story = {
  args: {
    id: 'hiddenlabel',
    name: 'hiddenlabel',
    label: 'label',
    hiddenLabel: true,
    placeholder: 'Select an option',
    options: storyOptions,
    $error: true,
    validationMessage: 'Validation message with error',
  },
}

export const WithIcon: Story = {
  args: {
    id: 'icon',
    name: 'icon',
    label: 'With Icon SelectGroup',
    placeholder: 'Select an option',
    options: storyOptionsWithIcon,
    icon: 'icon',
  }
}
