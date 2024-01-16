import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from '../../components/molecules/Modal'
// import {Button} from "../atoms/Button.stories"

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 250,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    isOpen: { control: 'boolean' },
    toggleModal: {
      description: 'toggleModal',
      action: 'toggleModal',
      type: 'function'
    },
    title: { title: 'title', control: 'text' },

  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    children: 'Children in modal',
    isOpen: true,
    title: 'Modal Title',
    toggleModal: () => { },
  },
}
export const IsClosed: Story = {
  args: {
    children: 'Children in modal',
    isOpen: false,
    title: 'Modal Title',
  },
}
