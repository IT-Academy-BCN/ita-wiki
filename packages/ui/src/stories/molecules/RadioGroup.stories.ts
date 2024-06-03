import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from '../../components/molecules'

 const meta = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    errorMessage: { control: 'text' },
    hiddenLabelGroup: { control: 'boolean', defaultValue: false },
    error: { control: 'boolean', defaultValue: false },
    options: [
      {
        id: { control: 'text' },
        name: { control: 'text' },
      },
    ],
    inputName: { control: 'text' },
    onChange: { action: 'clicked' },
    hiddenLabel: { control: 'boolean', defaultValue: false },
    defaultChecked: { control: 'text' },
    direction: {
      control: 'select',
      options: ['row', 'column'],
      defaultValue: 'row',
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type RadioGroupStory = StoryObj<typeof RadioGroup>

export const Default: RadioGroupStory = {
  args: {
    id: 'resourceType',
    label: 'Resource Type',
    options: [
      { id: 'option1', name: 'Option1' },
      { id: 'option2', name: 'Option2' },
      { id: 'option3', name: 'Option3' },
    ],
    direction: 'row',
    inputName: 'resourceType',
    error: false,
  },
}

export const WithValidationMessageRow: RadioGroupStory = {
  args: {
    id: 'resourceType',
    inputName: 'RadioGroup_name',
    label: 'RadioGroup with validation message',
    options: [
      { id: 'option1', name: 'Option1' },
      { id: 'option2', name: 'Option2' },
      { id: 'option3', name: 'Option3' },
    ],
    direction: 'row',
    error: true,
    errorMessage: 'Error message.',
  },
}

export const WithValidationMessageColumn: RadioGroupStory = {
  args: {
    id: 'resourceType',
    inputName: 'RadioGroup_name',
    label: 'RadioGroup with validation message',
    options: [
      { id: 'option1', name: 'Option1' },
      { id: 'option2', name: 'Option2' },
      { id: 'option3', name: 'Option3' },
    ],
    direction: 'column',
    error: true,
    errorMessage: 'Error message.',
  },
}
