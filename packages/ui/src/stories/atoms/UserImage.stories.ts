import type { Meta, StoryObj } from '@storybook/react'
import UserImage from '../../components/atoms/UserImage'
import icons from '../../assets/icons'

const meta = {
    title: 'Atoms/UserImage',
    component: UserImage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

    argTypes: {
        src: {
            control: { type: "select" },
            type: 'string',
            options: [`''`,
                `${icons.profileAvatar}`,
                `${icons.user}`
            ],
        },
        alt: {
            control: { type: 'select' },
            type: 'string',
            options: ['Sin imagen de usuario', 'user name']
        },
    },
} satisfies Meta<typeof UserImage>

export default meta
type Story = StoryObj<typeof UserImage>

// const withNoImage: Decorator = (Story) => (
//     <div 
//       style= {{
//         width: '97px',
//         height: '97px',
//         borderRadius: '50%',
//     }}
//         >
//     <Story/>
//     </div>)

export const Default: Story = {
    args: {
        src: `${icons.profileAvatar}`,
        alt: 'user name',
    },
}
export const NoAvatar: Story = {
    args: {
        src: `${icons.user}`,
    },
}
export const ImageError: Story = {
    args: {
        alt: 'Sin imagen de usuario',
    },
    // decorators: [withNoImage],

}
