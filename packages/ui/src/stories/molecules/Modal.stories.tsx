import type { Meta, StoryObj } from '@storybook/react'
import { FC, useState } from 'react'
import { Button } from '../../components/atoms/Button'
import { Modal } from '../../components/molecules/Modal'

type TModalForDocs = {
  isOpen: boolean
  children: React.ReactNode
  title: string
  toggleModal: () => void
}

const ModalForDocs: FC<TModalForDocs> = ({
  title,
  children,
  isOpen,
  toggleModal,
}) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Button onClick={() => setOpenModal(!openModal)}>Open Modal</Button>
      <Modal
        isOpen={openModal || isOpen}
        toggleModal={() => {
          setOpenModal(!openModal)
          toggleModal()
        }}
        title={title}
      >
        {children}
      </Modal>
    </>
  )
}

const meta = {
  title: 'Molecules/Modal',
  component: ModalForDocs,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 250,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    title: 'Modal Title',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Overwritten description',
    },
  },
} satisfies Meta<typeof ModalForDocs>

export default meta
type Story = StoryObj<typeof ModalForDocs>

export const Default: Story = {
  args: {
    children: 'Children in Modal',
    isOpen: false,
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
