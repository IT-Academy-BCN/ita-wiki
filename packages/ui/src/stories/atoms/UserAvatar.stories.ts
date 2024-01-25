import type { Meta, StoryObj } from '@storybook/react'
// import { FC } from 'react';
import UserAvatar from '../../components/atoms/UserAvatar'
import Icons from '../../assets/icons'

// type TUserAvatarForDocs = {
//     src: string
//     alt: string
// }
// const UserAvatarForDocs: FC<TUserAvatarForDocs> = ({
//     src,
//     alt
// }) => {
//     return <UserAvatar src={ src } alt = { alt } />
// };


const meta = {
    title: 'Atoms/UserAvatar',
    component: UserAvatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

    argTypes: {
        src: { control: 'text' },
        alt: {
            control: { type: 'select' },
            type: 'string',
            options: ['Sin imagen de usuario', 'user name']
        },
    },
} satisfies Meta<typeof UserAvatar>

export default meta
type Story = StoryObj<typeof UserAvatar>

export const Default: Story = {
    args: {
        src: Icons.noAvatarImage,
        alt: 'user name',
    },
}
export const WithAvatar: Story = {
    args: {
        src: `${Icons.profileAvatar}`,
    },
}
export const AvatarError: Story = {
    parameters: {
        docs: {
            description: {
                story: 'La imagen de usuario no se encuentra disponible.',
            }
        }
    },
    args: {
        alt: 'Sin imagen de usuario',
    }

}
