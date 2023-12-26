import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../../components/atoms/Icon'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/Icon',
    component: Icon,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes

    argTypes: {
        onClick: {
            action: 'previous Page icon'
        },
        wght: { control: 'number' },
        color: {
            control: 'color',
        },

    },
} satisfies Meta<typeof Icon>

export default meta
type IconStory = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: IconStory = {

    args: {
        name: '',
        fill: 1,
        wght: 400,
        grad: 0,
        opsz: 48,
        className: '',
        color: '',
        cursor: '',
    },
}