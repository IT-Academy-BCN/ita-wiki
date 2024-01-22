import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from '../../../components/molecules'
import { Text } from '../../../components/atoms'

const ContentA = () => <Text>The content in the Tab A</Text>
const ContentB = () => <Text>The content in the Tab B</Text>
const ContentBActive = () => (
  <Text>The content in the Tab B. Tab active by default.</Text>
)
const ContentC = () => <Text>The content in the Tab C</Text>

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    defaultActiveTab: {
      control: {
        type: 'number',
        min: 0,
        max: 2,
      },
    },
    tabsData: {
      control: 'object',
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
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabsData: [
      { title: 'Tab Item A', tabComponent: <ContentA /> },
      { title: 'Tab Item B', tabComponent: <ContentB /> },
      { title: 'Tab Item C', tabComponent: <ContentC /> },
    ],
    defaultActiveTab: 0,
  },
}

export const SecondTabActive: Story = {
  args: {
    tabsData: [
      { title: 'Tab Item A', tabComponent: <ContentA /> },
      { title: 'Tab Item B', tabComponent: <ContentBActive /> },
      { title: 'Tab Item C', tabComponent: <ContentC /> },
    ],
    defaultActiveTab: 1,
  },
}
