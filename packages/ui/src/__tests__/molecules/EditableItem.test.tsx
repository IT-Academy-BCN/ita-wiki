import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { EditableItem } from '../../components/molecules'

const onClickRowStatus = vi.fn()
const onClickErrorMessage = vi.fn()
const onClickItemChange = vi.fn()

const propsEditableITem = {
  handleRowStatus: onClickRowStatus,
  handleErrorMessage: onClickErrorMessage,
  handleItemChange: onClickItemChange,
  newItemTxt: '+ Create new item',
  placeholderTxt: 'Item name',
  newPlaceholderTxt: 'New item name',
  cancelTxt: 'Cancel',
  editTxt: 'Edit',
  confirmEditTxt: 'Confirm edit',
  cancelEditTxt: 'Cancel edit',
  deleteTxt: 'Delete item',
  deleteIcon: 'Icon svg',
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('EditableItem component', () => {
  it('renders correctly in available mode when there is no item', async () => {
    render(
      <EditableItem
        id="newItem"
        name=""
        rowStatus="available"
        {...propsEditableITem}
      />
    )

    const textCreateNewItem = screen.getByText('+ Create new item')

    expect(textCreateNewItem).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 1`)

    fireEvent.click(textCreateNewItem)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('editing', 'newItem')
    )
  })

  it('renders item correctly in available mode', async () => {
    render(
      <EditableItem
        id="testItemId"
        name="testItemName"
        rowStatus="available"
        {...propsEditableITem}
      />
    )

    expect(screen.getByText('testItemName')).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: 'Edit' })

    expect(editButton).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Delete item' })
    ).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 1`)

    fireEvent.click(editButton)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('editing', 'testItemId')
    )
  })

  it('renders new item correctly in editing mode', async () => {
    render(
      <EditableItem
        id="newItem"
        name=""
        rowStatus="editing"
        {...propsEditableITem}
      />
    )

    const itemInput = screen.getByPlaceholderText('New item name')

    expect(itemInput).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 1`)

    const confirmEdit = screen.getByRole('button', {
      name: 'Confirm edit',
    })

    const cancelEdit = screen.getByRole('button', {
      name: 'Cancel edit',
    })

    expect(confirmEdit).toBeInTheDocument()
    expect(cancelEdit).toBeInTheDocument()

    await userEvent.type(itemInput, 'New test item name')

    fireEvent.click(confirmEdit)

    await waitFor(() => expect(onClickItemChange).toHaveBeenCalled())
  })

  it('renders correctly in disabled mode', () => {
    render(
      <EditableItem
        id="testItemId"
        name="testItemName"
        rowStatus="disabled"
        {...propsEditableITem}
      />
    )

    expect(screen.getByText('testItemName')).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: 'Edit' })

    expect(editButton).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Delete item' })
    ).toBeInTheDocument()

    expect(screen.getByTestId('rowContainer')).toHaveStyle(`opacity: 0.5`)
    expect(screen.getByTestId('rowContainer')).toHaveStyle(
      `pointer-events: none`
    )
  })

  it('renders correctly in editing mode', async () => {
    render(
      <EditableItem
        id="testItemId"
        name="testItemName"
        rowStatus="editing"
        {...propsEditableITem}
      />
    )

    const itemInput = screen.getByDisplayValue('testItemName')

    expect(itemInput).toBeInTheDocument()

    const confirmEdit = screen.getByRole('button', {
      name: 'Confirm edit',
    })

    expect(confirmEdit).toBeInTheDocument()

    fireEvent.click(confirmEdit)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )

    await userEvent.type(itemInput, 'New test item name')

    fireEvent.click(confirmEdit)
    await waitFor(() => expect(onClickItemChange).toHaveBeenCalled())
  })

  it('cancel button exits edit mode ', async () => {
    render(
      <EditableItem
        id="testItemId"
        name="testItemName"
        rowStatus="editing"
        {...propsEditableITem}
      />
    )

    const itemInput = screen.getByDisplayValue('testItemName')

    expect(itemInput).toBeInTheDocument()

    const cancelEdit = screen.getByRole('button', {
      name: 'Cancel edit',
    })

    expect(cancelEdit).toBeInTheDocument()
    fireEvent.click(cancelEdit)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )
  })

  it('editing confirm button does not update the item name if it is not changed', async () => {
    render(
      <EditableItem
        id="testItemjId"
        name="testItemName"
        rowStatus="editing"
        {...propsEditableITem}
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

  it('editing confirm button throws an error if item name is empty', async () => {
    render(
      <EditableItem
        id="testItemId"
        name="testItemName"
        rowStatus="editing"
        {...propsEditableITem}
      />
    )

    const itemInput = screen.getByDisplayValue(
      'testItemName'
    ) as HTMLInputElement

    await userEvent.clear(itemInput)

    expect(itemInput.placeholder).toBe('Item name')

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Confirm edit',
      })
    )

    await waitFor(() =>
      expect(onClickErrorMessage).toHaveBeenCalledWith('errorEmptyTxt')
    )

    expect(onClickItemChange).not.toHaveBeenCalled()
  })

  it('renders correctly in deleting mode', async () => {
    render(
      <EditableItem
        id="testItemId"
        name="testItemName"
        rowStatus="deleting"
        {...propsEditableITem}
      />
    )

    const itemText = screen.getByText('testItemName')
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    const deleteButton = screen.getByRole('button', { name: 'Delete item' })

    expect(itemText).toBeInTheDocument()
    expect(itemText).toHaveStyle(`text-decoration: line-through`)

    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton)
    await waitFor(() => expect(onClickItemChange).toHaveBeenCalled())

    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)
    await waitFor(() =>
      expect(onClickRowStatus).toHaveBeenCalledWith('available', '')
    )
  })
})
