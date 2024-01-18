import type { Meta, StoryObj } from '@storybook/react'
import { InputGroup } from '../../components/molecules'

const meta = {
  title: 'Molecules/InputGroup',
  component: InputGroup,

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    validationType: {
      control: 'select',
      options: ['success', 'error', 'warning'],
    },
    validationMessage: { control: 'text' },
    icon: { control: 'text' },
    hiddenLabel: { control: 'boolean', defaultValue: true },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type InputGroupStory = StoryObj<typeof InputGroup>

export const Default: InputGroupStory = {
  args: {
    id: 'inputGroup_id',
    name: 'inputGroup_name',
    label: 'Default InputGroup',
    placeholder: 'Write here',
  },
}

export const WithValidationMessage: InputGroupStory = {
  args: {
    id: 'inputGroup_id',
    name: 'inputGroup_name',
    label: 'InputGroup with validation message',
    placeholder: 'Write here',
    validationMessage: 'error message.',
    validationType: 'error',
  },
}
export const WithIcon: InputGroupStory = {
  args: {
    id: 'inputGroup_id',
    name: 'inputGroup_name',
    label: 'InputGroup with icon',
    placeholder: 'Write here',
    icon: 'search',
  },
}
