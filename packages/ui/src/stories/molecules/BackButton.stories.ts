import type { Meta, StoryObj } from '@storybook/react'
import { BackButton } from '../../components/molecules'

const meta = {
  title: 'Molecules/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'handlePrevPage' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof BackButton>

export default meta
type BackButtonStory = StoryObj<typeof BackButton>

export const Default: BackButtonStory = {
  args: {
    children: 'torna',
  },
  decorators: [],
}

export const IconArrow = {
  args: {
    name: 'arrow_back_ios',
    fill: 1,
    $wght: 700,
    children: '',
  },
}
