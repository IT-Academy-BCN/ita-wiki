import type { Meta, StoryObj } from '@storybook/react'
import { FC, useState } from 'react'
import { FlexBox } from '../../../styles'
import { ValidationMessage } from '../../../components/atoms'
import {
  TItem,
  TItemRow,
  TRowStatus,
  EditableItem,
} from '../../../components/molecules'
import deleteIcon from './delete-icon.svg'

const newItemTxt = '+ Create new item'
const placeholderTxt = 'Item name'
const newPlaceholderTxt = 'New item name'
const cancelTxt = 'Cancel'
const editTxt = 'Edit'
const confirmEditTxt = 'Confirm edit'
const cancelEditTxt = 'Cancel edit'
const deleteTxt = 'Delete item'

type TMockedEditableItem = {
  id: string
  name: string
  rowStatus: TRowStatus
} & TItemRow

const MockedEditableItem: FC<TMockedEditableItem> = ({
  rowStatus,
  id,
  name,
}) => {
  const [itemId, setItemId] = useState(id)
  const [itemTxt, setItemTxt] = useState(name)
  const [statusRow, setStatusRow] = useState<TRowStatus>(rowStatus)
  const [errorMessage, setErrorMessage] = useState('')

  const handleRowStatus = (rowStatusReceived: TRowStatus) => {
    setStatusRow(rowStatusReceived)
  }

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message)
  }

  const handleItemChange = (actionTxt: string, itemObject: TItem) => {
    if (actionTxt === 'delete') {
      setItemId('newItem')
      handleErrorMessage('')
      setStatusRow('available')
    } else {
      handleErrorMessage('')
      const updatedItemTxt = itemObject.name
      setItemTxt(updatedItemTxt)
      setStatusRow('available')
      if (actionTxt === 'create') {
        setItemId('itemB')
      }
    }
  }

  return (
    <FlexBox style={{ width: '25rem', height: '6rem' }} justify="flex-start">
      <EditableItem
        id={itemId}
        name={itemTxt}
        rowStatus={statusRow}
        handleRowStatus={handleRowStatus}
        handleErrorMessage={handleErrorMessage}
        handleItemChange={handleItemChange}
        newItemTxt={newItemTxt}
        placeholderTxt={placeholderTxt}
        newPlaceholderTxt={newPlaceholderTxt}
        editTxt={editTxt}
        cancelTxt={cancelTxt}
        confirmEditTxt={confirmEditTxt}
        cancelEditTxt={cancelEditTxt}
        deleteTxt={deleteTxt}
        deleteIcon={deleteIcon}
      />

      {errorMessage ? (
        <ValidationMessage
          color="error"
          text="Please do not leave the item name empty."
        />
      ) : null}
    </FlexBox>
  )
}

const meta = {
  title: 'Molecules/EditableItem',
  component: MockedEditableItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    rowStatus: {
      control: 'select',
      options: ['available', 'editing', 'deleting', 'disabled'],
      defaultValue: 'available',
    },
    newItemTxt: { control: 'text' },
    placeholderTxt: { control: 'text' },
    newPlaceholderTxt: { control: 'text' },
    editTxt: { control: 'text' },
    cancelTxt: { control: 'text' },
    confirmEditTxt: { control: 'text' },
    cancelEditTxt: { control: 'text' },
    deleteTxt: { control: 'text' },
    deleteIcon: { control: 'text' },
  },
  args: {
    newItemTxt,
    placeholderTxt,
    newPlaceholderTxt,
    editTxt,
    cancelTxt,
    confirmEditTxt,
    cancelEditTxt,
    deleteTxt,
    deleteIcon,
  },
} satisfies Meta<typeof EditableItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'default1',
    name: 'Default item name',
    rowStatus: 'available',
  },
}

export const CreatingNew: Story = {
  args: {
    id: 'newItem',
    name: '',
    rowStatus: 'available',
  },
}

export const Editing: Story = {
  args: {
    id: 'editing1',
    name: 'Item name in edition',
    rowStatus: 'editing',
  },
}

export const Deleting: Story = {
  args: {
    id: 'deleted1',
    name: 'Item about to delete',
    rowStatus: 'deleting',
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabled1',
    name: 'Item disabled',
    rowStatus: 'disabled',
  },
}
