import type { Meta, StoryObj } from '@storybook/react'
import { InputGroup } from '../../components/molecules'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/InputGroup',
  component: InputGroup,

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  id: { control: 'text' },
  name: { control: 'text' },
  label: { control: 'text' },
  validationType: { control: 'select', options: ['success', 'error', 'warning'] },
  validationMessage: { control: 'text' },
  icon: { control: 'text' },
  hiddenLabel: {control: 'boolean', defaultValue: true},

  }, 
} satisfies Meta<typeof InputGroup>

export default meta
type InputGroupStory = StoryObj<typeof InputGroup>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: InputGroupStory = {
  args: {
    id: "inputGroup_id",
    name: "inputGroup_name",
  }, 
}

export const WithValidationMessage: InputGroupStory = {
  args: {
    id: "inputGroup_id",
    name: "inputGroup_name",
    validationMessage: "error message.",
    validationType: "error",
    
  },
}
export const WithIcon : InputGroupStory = {
  args: {
    id: "inputGroup_id",
    name: "inputGroup_name",
    icon: "search",
  },
}