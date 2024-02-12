import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { TopicsEditableItem } from '../../components/molecules'

const onClickRowStatus = vi.fn()
const onClickErrorMessage = vi.fn()
const onClickTopicChange = vi.fn()

const newTopicTxt = '+ Create new topic'
const placeholderTxt = 'Topic name'
const newPlaceholderTxt = 'New topic name'
const cancelTxt = 'Cancel'
const editTxt = 'Edit'
const confirmEditTxt = 'Confirm edit'
const cancelEditTxt = 'Cancel edit'
const deleteTxt = 'Delete topic'
const deleteIcon = 'Icon svg'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('TopicsEditableItem component', () => {
  it('renders correctly in available mode when there is no topic', async () => {
    render(
      <TopicsEditableItem
        id="newTopic"
        name=""
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
        rowStatus="available"
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
    )

    const textCreateNewTopic = screen.getByText('+ Create new topic')

    expect(textCreateNewTopic).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 1`)

    fireEvent.click(textCreateNewTopic)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('editing', 'newTopic')
    )
  })

  it('renders topic correctly in available mode', async () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
        rowStatus="available"
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
    )

    expect(screen.getByText('testTopicName')).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: 'Edit' })

    expect(editButton).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Delete topic' })
    ).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 1`)

    fireEvent.click(editButton)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('editing', 'testTopicId')
    )
  })

  it('renders new topic correctly in editing mode', async () => {
    render(
      <TopicsEditableItem
        id="newTopic"
        name=""
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
        rowStatus="editing"
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
    )

    const topicInput = screen.getByPlaceholderText('New topic name')

    expect(topicInput).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 1`)

    const confirmEdit = screen.getByRole('button', {
      name: 'Confirm edit',
    })

    const cancelEdit = screen.getByRole('button', {
      name: 'Cancel edit',
    })

    expect(confirmEdit).toBeInTheDocument()
    expect(cancelEdit).toBeInTheDocument()

    await userEvent.type(topicInput, 'New test topic name')

    fireEvent.click(confirmEdit)

    await waitFor(() => expect(onClickTopicChange).toHaveBeenCalled())
  })

  it('renders correctly in disabled mode', () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
        rowStatus="disabled"
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
    )

    expect(screen.getByText('testTopicName')).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: 'Edit' })

    expect(editButton).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Delete topic' })
    ).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 0.5`)
    expect(screen.getByTestId('rowContainer')).toHaveStyle(
      `pointer-events: none`
    )
  })

  it('renders correctly in editing mode', async () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
        rowStatus="editing"
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
    )

    const topicInput = screen.getByDisplayValue('testTopicName')

    expect(topicInput).toBeInTheDocument()

    const confirmEdit = screen.getByRole('button', {
      name: 'Confirm edit',
    })

    expect(confirmEdit).toBeInTheDocument()

    fireEvent.click(confirmEdit)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )

    await userEvent.type(topicInput, 'New test topic name')

    fireEvent.click(confirmEdit)
    await waitFor(() => expect(onClickTopicChange).toHaveBeenCalled())
  })

  it('cancel button exits edit mode ', async () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
        rowStatus="editing"
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
    )

    const topicInput = screen.getByDisplayValue('testTopicName')

    expect(topicInput).toBeInTheDocument()

    const cancelEdit = screen.getByRole('button', {
      name: 'Cancel edit',
    })

    expect(cancelEdit).toBeInTheDocument()
    fireEvent.click(cancelEdit)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )
  })

  it('editing confirm button does not update the topic name if it is not changed', async () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        rowStatus="editing"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
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
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Confirm edit',
      })
    )
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )
  })

  it('editing confirm button throws an error if topic name is empty', async () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
        rowStatus="editing"
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
    )

    const topicInput = screen.getByDisplayValue(
      'testTopicName'
    ) as HTMLInputElement

    await userEvent.clear(topicInput)

    expect(topicInput.placeholder).toBe('Topic name')

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Confirm edit',
      })
    )

    await waitFor(() =>
      expect(onClickErrorMessage).toHaveBeenCalledWith('errorEmptyTxt')
    )

    expect(onClickTopicChange).not.toHaveBeenCalled()
  })

  it('renders correctly in deleting mode', async () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
        rowStatus="deleting"
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
    )

    const topicText = screen.getByText('testTopicName')
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    const deleteButton = screen.getByRole('button', { name: 'Delete topic' })

    expect(topicText).toBeInTheDocument()
    expect(topicText).toHaveStyle(`text-decoration: line-through`)

    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton)
    await waitFor(() => expect(onClickTopicChange).toHaveBeenCalled())

    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )
  })
})
