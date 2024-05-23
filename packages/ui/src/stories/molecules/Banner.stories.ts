import type { Meta, StoryObj } from '@storybook/react'
import { Banner } from "../../components/molecules";

const meta = {
    title: 'Molecules/Banner',
    component: Banner,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        buttonText: { control: 'text' },
        imgUrl: { control: 'text' },
        imgAltText: { control: 'text' },
    },
} satisfies Meta<typeof Banner>

export default meta
type BannerStory = StoryObj<typeof Banner>

export const Default: BannerStory = {
    args: {
        title: 'Sample Title',
        description: 'This is a sample description for the banner.',
        buttonText: 'Accept',
        imgUrl: 'https://via.placeholder.com/150',
        imgAltText: 'Alt image text',
    },
}

