import type { Meta, StoryObj } from '@storybook/react'
import Icon from '../../components/atoms/Icon'
import { font } from '../../styles/font'

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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: IconStory = {
  args: {
    name: 'arrow_back_ios',
    fill: 1,
    $wght: 400,
    $grad: 0,
    $opsz: 48,
    className: '',
    color: '',
    cursor: '',
  },
}
export const Variant: IconStory = {
  args: {
    name: 'arrow_back_ios',
    $wght: 700,
    style: { fontSize: `${font.base}` },
  },
}
