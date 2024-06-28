import type { Meta, StoryObj } from '@storybook/react'
import { HamburgerMenu } from '../../components/atoms'
import { FC, useState } from 'react'

type THamburgerMenuForDocs = {
  open: boolean
  onClick: () => void
}

const HamburgerMenuForDocs: FC<THamburgerMenuForDocs> = ({ open, onClick }) => {
  const [isOpen, setIsOpen] = useState(open)
  return (
    <HamburgerMenu
      open={isOpen || open}
      onClick={() => {
        setIsOpen(!isOpen)
        onClick()
      }}
    />
  )
}

const meta: Meta<typeof HamburgerMenuForDocs> = {
  title: 'Atoms/HamburgerMenu',
  component: HamburgerMenuForDocs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
}

export default meta
type HamburgerMenuStory = StoryObj<typeof HamburgerMenuForDocs>

export const Closed: HamburgerMenuStory = {
  args: {
    open: false,
  },
}

export const Opened: HamburgerMenuStory = {
  args: {
    open: true,
  },
}
