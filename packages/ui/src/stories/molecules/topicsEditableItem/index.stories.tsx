import type { Meta, StoryObj } from '@storybook/react'
import { FC, useState } from 'react'
import { FlexBox } from '../../../styles'
import { ValidationMessage } from '../../../components/atoms'
import {
  TTopic,
  TTopicRow,
  TopicsEditableItem,
} from '../../../components/molecules'
import deleteIcon from './delete-icon.svg'

const newTopicTxt = '+ Create new topic'
const placeholderTxt = 'Topic name'
const newPlaceholderTxt = 'New topic name'
const cancelTxt = 'Cancel'
const editTxt = 'Edit'
const confirmEditTxt = 'Confirm edit'
const cancelEditTxt = 'Cancel edit'
const deleteTxt = 'Delete topic'

type TMockedTopicsEditableItem = {
  id: string
  name: string
  rowStatus: 'available' | 'editing' | 'deleting' | 'disabled'
} & TTopicRow

const MockedTopicsEditableItem: FC<TMockedTopicsEditableItem> = ({
  rowStatus,
  id,
  name,
}) => {
  const [topicId, setTopicId] = useState(id)
  const [topicTxt, setTopicTxt] = useState(name)
  const [statusRow, setStatusRow] = useState<
    'available' | 'editing' | 'deleting' | 'disabled'
  >(rowStatus)
  const [errorMessage, setErrorMessage] = useState('')

  const handleRowStatus = (rowStatusReceived: string) => {
    if (rowStatusReceived === 'disabled') {
      setStatusRow('disabled')
    }
    if (rowStatusReceived === 'editing') {
      setStatusRow('editing')
    }
    if (rowStatusReceived === 'deleting') {
      setStatusRow('deleting')
    }
    if (rowStatusReceived === 'available') {
      setStatusRow('available')
    }
  }

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message)
  }

  const handleTopicChange = (actionTxt: string, topicObject: TTopic) => {
    if (actionTxt === 'delete') {
      setTopicId('newTopic')
      handleErrorMessage('')
      setStatusRow('available')
    } else {
      handleErrorMessage('')
      const updatedTopicTxt = topicObject.name
      setTopicTxt(updatedTopicTxt)
      setStatusRow('available')
      if (actionTxt === 'create') {
        setTopicId('topic')
      }
    }
  }

  return (
    <FlexBox style={{ width: '25rem', height: '6rem' }} justify="flex-start">
      <TopicsEditableItem
        id={topicId}
        name={topicTxt}
        rowStatus={statusRow}
        handleRowStatus={handleRowStatus}
        handleErrorMessage={handleErrorMessage}
        handleTopicChange={handleTopicChange}
        newTopicTxt={newTopicTxt}
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
          text="Please do not leave the topic name empty."
        />
      ) : null}
    </FlexBox>
  )
}

const meta = {
  title: 'Molecules/TopicsEditableItem',
  component: MockedTopicsEditableItem,
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
    newTopicTxt: { control: 'text' },
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
    newTopicTxt,
    placeholderTxt,
    newPlaceholderTxt,
    editTxt,
    cancelTxt,
    confirmEditTxt,
    cancelEditTxt,
    deleteTxt,
    deleteIcon,
  },
} satisfies Meta<typeof TopicsEditableItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'default1',
    name: 'Default topic name',
    rowStatus: 'available',
  },
}

export const CreatingNew: Story = {
  args: {
    id: 'newTopic',
    name: '',
    rowStatus: 'available',
  },
}

export const Editing: Story = {
  args: {
    id: 'editing1',
    name: 'Topic name in edition',
    rowStatus: 'editing',
  },
}

export const Deleting: Story = {
  args: {
    id: 'deleted1',
    name: 'Topic about to delete',
    rowStatus: 'deleting',
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabled1',
    name: 'Topic disabled',
    rowStatus: 'disabled',
  },
}
