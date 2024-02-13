import type { Meta, StoryObj } from '@storybook/react'
import { ResourceTitleLink } from '../../components/molecules'

const meta = {
  title: 'Molecules/ResourceTitleLink',
  component: ResourceTitleLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    description: { control: 'text' },
    title: { control: 'text' },
    url: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof ResourceTitleLink>

export default meta
type ResourceTitleLinkStory = StoryObj<typeof meta>

export const Default: ResourceTitleLinkStory = {
  args: {
    description: 'This is a default resource link',
    title: 'Resource Title Link',
    url: 'https://www.npmjs.com/package/@itacademy/ui?activeTab=readme',
  },
}
