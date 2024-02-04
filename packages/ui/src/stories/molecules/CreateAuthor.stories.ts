import type { Meta, StoryObj } from '@storybook/react'
import { CreateAuthor } from '../../components/molecules/CreateAuthor'
import github from '../assets/github.svg'

const meta = {
    title: 'Molecules/CreateAuthor',
    component: CreateAuthor,

    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],
    argTypes: {
        createdBy: { control: 'text' },
        updatedAt: { control: 'text' },
        img: { control: 'text' },
    },
} satisfies Meta<typeof CreateAuthor>

export default meta
type BackButtonStory = StoryObj<typeof CreateAuthor>

export const Default: BackButtonStory = {
    args: {
        createdBy: 'IT-academy',
        updatedAt: '02/04/2024'
    },
}

export const WithImg: BackButtonStory = {
    args: {
        createdBy: 'IT-academy',
        updatedAt: '02/04/2024',
        img: github
    }
}


