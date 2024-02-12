import type { Meta, StoryObj } from '@storybook/react'
import { HamburgerMenu } from '../../components/atoms'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/HamburgerMenu',
  component: HamburgerMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    open: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof HamburgerMenu>

export default meta
type HamburgerMenuStory = StoryObj<typeof HamburgerMenu>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Closed: HamburgerMenuStory = {
  args: {
    open: false,
  },
}

export const Opened: HamburgerMenuStory = {
  args: {
    open: true,
  },
}
