import type { Meta, StoryObj } from '@storybook/react'
import { TextareaGroup } from '../../components/molecules'

const meta = {
  title: 'Molecules/TextareaGroup',
  component: TextareaGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    hiddenLabel: { control: 'boolean' },
    validationMessage: { control: 'text' },
    validationType: { control: 'text' },
  },
} satisfies Meta<typeof TextareaGroup>

export default meta
type TextareaGroupStory = StoryObj<typeof TextareaGroup>

export const Default: TextareaGroupStory = {
  args: {
    id: 'test-id',
    name: 'test-name',
    label: 'label',
    hiddenLabel: true,
    validationMessage: 'test-validation-message',
    validationType: 'success',
  },
}

export const ValidationTypeError: TextareaGroupStory = {
  args: {
    id: 'test-id',
    name: 'test-name',
    label: 'label',
    hiddenLabel: false,
    validationMessage: 'test-validation-message',
    validationType: 'error',
  },
}
export const ValidationTypeWarning: TextareaGroupStory = {
  args: {
    id: 'test-id',
    name: 'test-name',
    label: 'label',
    hiddenLabel: false,
    validationMessage: 'test-validation-message',
    validationType: 'warning',
  },
}
export const ValidationTypeUndefined: TextareaGroupStory = {
  args: {
    id: 'test-id',
    name: 'test-name',
    label: 'label',
    hiddenLabel: false,
    validationMessage: 'test-validation-message',
    validationType: undefined,
  },
}
