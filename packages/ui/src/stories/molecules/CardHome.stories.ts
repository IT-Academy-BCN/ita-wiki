import type { Meta, StoryObj } from '@storybook/react'
import { CardHome } from '../../components/molecules'
import customImg from '../assets/puzzle-dynamic-color.svg'
import customBackground from '../assets/bg-home-card-corner.svg'

const meta = {
  title: 'Molecules/CardHome',
  component: CardHome,

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    cardTitle: { control: 'string' },
    cardSubtitle: { control: 'string' },
    indicator: { control: 'string' },
    icon: { control: 'string' },
    backgroundImg: { control: 'string' },
  },
} satisfies Meta<typeof CardHome>

export default meta
type CardHomeStory = StoryObj<typeof CardHome>

export const Default: CardHomeStory = {
  args: {
    cardTitle: 'CardHome_title',
    cardSubtitle: 'CardHome_subtitle',
    indicator: 'cardTitle_indicator',
    icon: '',
    backgroundImg: '',
  },
}

export const WithImgs: CardHomeStory = {
  args: {
    cardTitle: 'Guarda els teus recursos',
    cardSubtitle: 'Tingues els teus recursos',
    indicator: '/ 01',
    icon: customImg,
    backgroundImg: customBackground,
  },
}
