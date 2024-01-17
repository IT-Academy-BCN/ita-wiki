import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from '../../components/molecules/Modal'


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
    children: {
      control: 'text',
    },
    isOpen: { control: 'boolean' },
    toggleModal: {
      description: 'toggleModal',
      action: 'toggleModal',
      type: 'function'
    },
    title: { control: 'text' },

  },
  args: {
    children: 'Children in Modal',
    title: 'Modal Title',
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    children: 'Open Modal',

  },
}
export const IsOpen: Story = {
  args: {
    children: 'Children in Modal',
    isOpen: true,
  },
}
export const IsClosed: Story = {
  args: {
    children: 'Open Modal',
    isOpen: false,
  },
}
