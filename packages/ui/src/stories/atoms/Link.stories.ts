import type { Meta, StoryObj } from '@storybook/react'

import { Link } from '../../components/atoms'

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    weight: { control: 'select', options: ['bold', 'regular'] },
    href: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Link>

export default meta
type LinkStory = StoryObj<typeof meta>

export const DefaultLink: LinkStory = {
  args: {
    weight: 'regular',
    href: '/',
    children: 'This is the default link',
  },
}

export const BoldLink: LinkStory = {
  args: {
    weight: 'bold',
    href: '/',
    children: 'This is a bold link',
  },
}
