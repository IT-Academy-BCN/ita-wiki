import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../../components/atoms'
import { font } from '../../styles'

const meta = {

  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  
    color: {
      control: 'color',
    },

  },
} satisfies Meta<typeof Icon>

export default meta
export type IconStory = StoryObj<typeof meta>

export const Default: IconStory = {
  args: {
    name: 'arrow_back_ios',
    $wght: 400,
  },
}
export const Variant: IconStory = {
  args: {
    name: 'arrow_back_ios',
    style: { fontSize: `${font.base}` },
  },
}
export const IsFill: IconStory = {

  args: {
    name: 'favorite',
    $fill: 1,
  },

}
