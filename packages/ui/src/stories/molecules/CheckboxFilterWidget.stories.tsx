import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxFilterWidget } from '../../components/molecules'

const items = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
]

const meta = {
  title: 'Molecules/CheckboxFilterWidget',
  component: CheckboxFilterWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      defaultValue: 'column',
    },
    filterName: { control: 'text' },
    items: { control: 'object' },
    handleItemsFilter: { action: 'clicked' },
    defaultCheckedItems: { control: 'object' },
  },
} satisfies Meta<typeof CheckboxFilterWidget>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    filterName: 'Default Filter',
    items,
  },
}

export const AllOptionsChecked: Story = {
  args: {
    filterName: 'All items checked',
    items,
    defaultCheckedItems: items,
  },
}

export const OneOptionChecked: Story = {
  args: {
    filterName: 'Only one item checked',
    items,
    defaultCheckedItems: [{ id: 'option1', label: 'Option 1' }],
  },
}

export const DirectionRow: Story = {
  args: {
    direction: 'row',
    filterName: 'All items checked',
    items,
    defaultCheckedItems: items,
  },
}

export const WithoutTitle: Story = {
  args: {
    filterName: '',
    items,
    defaultCheckedItems: items,
  },
}

export const WithoutTitleRow: Story = {
  args: {
    direction: 'row',
    filterName: '',
    items,
    defaultCheckedItems: items,
  },
}
