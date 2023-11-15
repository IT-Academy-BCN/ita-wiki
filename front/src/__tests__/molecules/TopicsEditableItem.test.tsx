import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TopicsEditableItem } from '../../components/molecules'

const onClickRowStatus = vi.fn()
const onClickErrorMessage = vi.fn()
const onClickTopicChange = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

describe('TopicsEditableItem component', () => {
  it('renders correctly in available mode when there is no topic', async () => {
    render(
      <TopicsEditableItem
        id="newTopic"
        name=""
        rowStatus="available"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
      />
    )

    const textCreateNewTopic = screen.getByText('+ Crea un nou tema')

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
        rowStatus="available"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
      />
    )

    expect(screen.getByText('testTopicName')).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: 'Edita' })

    expect(editButton).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Esborra el tema' })
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
        rowStatus="editing"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
      />
    )

    const topicInput = screen.getByPlaceholderText('Nom del tema nou')

    expect(topicInput).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 1`)

    const confirmEdit = screen.getByRole('button', {
      name: "Confirma l'edició",
    })

    const cancelEdit = screen.getByRole('button', {
      name: "Cancel·la l'edició",
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
        rowStatus="disabled"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
      />
    )

    expect(screen.getByText('testTopicName')).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: 'Edita' })

    expect(editButton).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Esborra el tema' })
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
        rowStatus="editing"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
      />
    )

    const topicInput = screen.getByDisplayValue('testTopicName')

    expect(topicInput).toBeInTheDocument()

    const confirmEdit = screen.getByRole('button', {
      name: "Confirma l'edició",
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
        rowStatus="editing"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
      />
    )

    const topicInput = screen.getByDisplayValue('testTopicName')

    expect(topicInput).toBeInTheDocument()

    const cancelEdit = screen.getByRole('button', {
      name: "Cancel·la l'edició",
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
      />
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: "Confirma l'edició",
      })
    )
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )
  })

  it.skip('editing confirm button throws an error if topic name is empty', async () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        rowStatus="editing"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
      />
    )

    const topicInput = screen.getByDisplayValue(
      'testTopicName'
    ) as HTMLInputElement

    await userEvent.clear(topicInput)

    expect(topicInput.placeholder).toBe('Nom del tema')

    fireEvent.click(
      screen.getByRole('button', {
        name: "Confirma l'edició",
      })
    )

    await waitFor(() =>
      expect(onClickErrorMessage).toHaveBeenCalledWith(
        'Per favor, no deixis buit el nom del tema.'
      )
    )

    expect(onClickTopicChange).not.toHaveBeenCalled()
  })

  it('renders correctly in deleting mode', async () => {
    render(
      <TopicsEditableItem
        id="testTopicId"
        name="testTopicName"
        rowStatus="deleting"
        handleRowStatus={onClickRowStatus}
        handleErrorMessage={onClickErrorMessage}
        handleTopicChange={onClickTopicChange}
      />
    )

    const topicText = screen.getByText('testTopicName')
    const cancelButton = screen.getByRole('button', { name: 'Cancel·la' })
    const deleteButton = screen.getByRole('button', { name: 'Esborra el tema' })

    expect(topicText).toBeInTheDocument()
    expect(topicText).toHaveStyle(`text-decoration: line-through`)

    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton)
    await waitFor(() => expect(onClickErrorMessage).toHaveBeenCalled())

    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )
  })
})
