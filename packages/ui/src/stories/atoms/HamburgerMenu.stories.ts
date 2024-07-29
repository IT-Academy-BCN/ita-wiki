import type { Meta, StoryObj } from '@storybook/react'
import { HamburgerMenu } from '../../components/atoms'

const meta: Meta<typeof HamburgerMenu> = {
  title: 'Atoms/HamburgerMenu',
  component: HamburgerMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof HamburgerMenu>

export default meta
type HamburgerMenuStory = StoryObj<typeof HamburgerMenu>

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
