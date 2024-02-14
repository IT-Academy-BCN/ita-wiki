import type { Meta, StoryObj } from '@storybook/react'
import { UserButton } from '../../components/molecules/UserButton'
import custom from '../atoms/avatar/custom.svg'

const meta = {
    title: 'Molecules/UserButton',
    component: UserButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'handleAccion', type: 'function' },

    },

} satisfies Meta<typeof UserButton>

export default meta
type UserButtonStory = StoryObj<typeof UserButton>

export const Default: UserButtonStory = {

    args: {
        onClick: () => { },
    },
}
export const HasUser: UserButtonStory = {

    args: {

        user: {
            id: 'testId',
            name: 'testName',
            avatarId: custom,
            email: 'a@gmail.com',
            role: 'ADMIN'
        },
    },
}





