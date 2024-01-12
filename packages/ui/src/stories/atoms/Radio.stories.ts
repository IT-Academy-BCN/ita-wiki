import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '../../components/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>

export default meta
type RadioStory = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultRow: RadioStory = {
  args: {
    options: [
      { id: 'option1', name: 'Option 1' },
      { id: 'option2', name: 'Option 2' },
      { id: 'option3', name: 'Option 3' },
    ],
    inputName: 'defaultRow',
    direction: 'row',
  },
}

export const DefaultCheckedRow: RadioStory = {
  args: {
    options: [
      { id: 'option1', name: 'Option 1' },
      { id: 'option2', name: 'Option 2' },
      { id: 'option3', name: 'Option 3' },
    ],
    inputName: 'defaultCheckedRow',
    defaultChecked: 'option1',
    direction: 'row',
  },
}

export const Column: RadioStory = {
  args: {
    options: [
      { id: 'option1', name: 'Option 1' },
      { id: 'option2', name: 'Option 2' },
      { id: 'option3', name: 'Option 3' },
    ],
    inputName: 'radioColumn',
    direction: 'column',
  },
}

export const DefaultCheckedColumn: RadioStory = {
  args: {
    options: [
      { id: 'option1', name: 'Option 1' },
      { id: 'option2', name: 'Option 2' },
      { id: 'option3', name: 'Option 3' },
    ],
    inputName: 'radioColumn',
    defaultChecked: 'option1',
    direction: 'column',
  },
}
