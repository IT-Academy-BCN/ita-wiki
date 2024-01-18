import type { Meta, StoryObj } from '@storybook/react'
import Tabs from '../../../components/molecules/Tabs/Tabs'
import { Button } from '../../../components/atoms'

const ContentA = () => <Button>The content in the Tab A</Button>
const ContentB = () => <>The content in the Tab B</>

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    tabsData: {
      control: 'object',
      id: {
        name: 'id',
        type: 'string',
        description: 'Unique identifier for the tab',
        control: 'text',
      },

      title: {
        name: 'title',
        type: 'string',
        description: 'Title of the tab',
        required: true,
        control: 'text',
      },

      tabComponent: {
        name: 'tabComponent',
        type: 'object',
        description: 'React component to render for the tab',
        required: true,
        control: 'object',
      },

      requiredRole: {
        control: 'object',
        name: 'requiredRoles',
        type: 'array',
        description: 'List of roles required to view the tab',
        oneOf: [
          {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          {
            type: 'string',
          },
        ],
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    tabsData: [
      { title: 'Tab Item A', tabComponent: <ContentA /> },
      { title: 'Tab Item B', tabComponent: <ContentB /> },
    ],
  },
}

export const Active: Story = {
  args: {
    tabsData: [
      { title: 'Tab Item A', tabComponent: <ContentA /> },
      { title: 'Tab Item B', tabComponent: <ContentB /> },
    ],
  },
}
