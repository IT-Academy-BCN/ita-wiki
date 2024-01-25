import type { Meta, StoryObj } from '@storybook/react'
import { FC } from 'react';
import Avatar from '../../components/atoms/Avatar'

type TAvatarForDocs = {
    src: string
    alt: string
}

const defaultAvatar: string = (() => {
    const svgNoAvatarString = `
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.4769 14h-4.95396c-1.45806.0724-2.74984.963-3.33601 2.3-.707 1.388.704 2.7 2.7h6.93597c1.642 0 3.053-1.312 2.345-2.7-.5861-1.337-1.8779-2.2276-3.336-2.3" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m15 8c0 1.65685-1.3431 3-3 3s-3-1.34315-3-3 1.3431-3 3-3c.7956 0 1.5587.31607 2.1213.87868s.8787 1.32567.8787 2.12132z" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    `;
    const blob = new Blob([svgNoAvatarString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    return url;
})();

const svgAvatarString: string = (() => {
    const AvatarString = `
    <svg viewBox="-143.36 -143.36 1310.72 1310.72" xmlns="http://www.w3.org/2000/svg" fill="#6c2e9e" stroke="#6c2e9e" stroke-width="0.01024"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
    <path fill="#00000" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"></path></g></svg>
    `;
    const blob = new Blob([AvatarString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    return url;
})();
const UserAvatarForDocs: FC<TAvatarForDocs> = ({
    src,
    alt
}) => (
    <Avatar src={src === '' ? defaultAvatar : src} alt={alt} />
)

const meta = {
    title: 'Atoms/UserAvatar',
    component: UserAvatarForDocs,
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
} satisfies Meta<typeof UserAvatarForDocs>

export default meta
type Story = StoryObj<typeof UserAvatarForDocs>

export const Default: Story = {
    args: {
        src: defaultAvatar,
        alt: 'user name',
    },
}
export const WithAvatar: Story = {
    args: {
        src: `${svgAvatarString}`,
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
    },

}


