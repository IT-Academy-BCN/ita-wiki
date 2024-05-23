import type { Meta, StoryObj } from '@storybook/react'
import { Banner } from '../../components/molecules'

const meta = {
  title: 'Molecules/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    buttonText: { control: 'text' },
    imgUrl: { control: 'text' },
    imgAltText: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Banner>

export default meta
type BannerStory = StoryObj<typeof Banner>

export const Default: BannerStory = {
  args: {
    title: 'Sample Title',
    description: 'This is a sample description for the banner.',
    buttonText: 'Accept',
  },
}

export const WithImg: BannerStory = {
  args: {
    title: 'Banner with image',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s,',
    buttonText: 'Accept',
    imgUrl:
      'https://images.unsplash.com/photo-1601467295274-f2408b6e90f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imgAltText: 'Alt image text',
  },
}
