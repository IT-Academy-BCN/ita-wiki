import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { CheckboxFilterWidget } from '../../components/molecules'
import { dimensions } from '../../styles'

const items = [
  { id: 'item1', label: 'Item 1' },
  { id: 'item2', label: 'Item 2' },
  { id: 'item3', label: 'Item 3' },
]

describe('CheckboxFilterWidget component', () => {
  const handleItemsFilter = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders component correctly with all checkboxes unchecked', () => {
    render(
      <CheckboxFilterWidget
        filterName="text"
        items={items}
        handleItemsFilter={handleItemsFilter}
      />
    )

    expect(screen.getByText(/text/i)).toBeInTheDocument()

    const container = screen.getByTestId('container')
    expect(container).toHaveStyle('flex-direction: column')

    const allCheckboxes = screen.getAllByRole('checkbox')
    expect(allCheckboxes).toHaveLength(3)
    allCheckboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked())

    expect(screen.getByLabelText('Item 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Item 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Item 3')).toBeInTheDocument()

    expect(handleItemsFilter).toHaveBeenCalledTimes(1)
    expect(handleItemsFilter).toHaveBeenCalledWith([])
  })

  it('renders all checkboxes checked when provided', () => {
    render(
      <CheckboxFilterWidget
        filterName="text"
        items={items}
        handleItemsFilter={handleItemsFilter}
        defaultCheckedItems={items}
      />
    )
    const allCheckboxes = screen.getAllByRole('checkbox')

    expect(allCheckboxes).toHaveLength(3)
    allCheckboxes.forEach((checkbox) => expect(checkbox).toBeChecked())

    expect(handleItemsFilter).toHaveBeenCalledTimes(1)
    expect(handleItemsFilter).toHaveBeenCalledWith([
      { id: 'item1', label: 'Item 1' },
      { id: 'item2', label: 'Item 2' },
      { id: 'item3', label: 'Item 3' },
    ])
  })

  it('shows only provided checkboxes checked', () => {
    const defaultCheckedItems = [
      { id: 'item1', label: 'Item 1' },
      { id: 'item3', label: 'Item 3' },
    ]

    render(
      <CheckboxFilterWidget
        filterName="text"
        items={items}
        handleItemsFilter={handleItemsFilter}
        defaultCheckedItems={defaultCheckedItems}
      />
    )
    const allCheckboxes = screen.getAllByRole('checkbox')

    expect(allCheckboxes).toHaveLength(3)

    expect(allCheckboxes[0]).toBeChecked()
    expect(allCheckboxes[1]).not.toBeChecked()
    expect(allCheckboxes[2]).toBeChecked()

    expect(handleItemsFilter).toHaveBeenCalledTimes(1)
    expect(handleItemsFilter).toHaveBeenCalledWith([
      { id: 'item1', label: 'Item 1' },
      { id: 'item3', label: 'Item 3' },
    ])
  })

  it('should raise an onChange event when user clicks one checkbox', async () => {
    render(
      <CheckboxFilterWidget
        filterName="text"
        items={items}
        handleItemsFilter={handleItemsFilter}
        defaultCheckedItems={items}
      />
    )

    const checkboxA = screen.getByLabelText('Item 1')

    expect(checkboxA).toBeChecked()

    expect(handleItemsFilter).toHaveBeenCalledWith([
      { id: 'item1', label: 'Item 1' },
      { id: 'item2', label: 'Item 2' },
      { id: 'item3', label: 'Item 3' },
    ])

    fireEvent.click(checkboxA)

    await waitFor(() =>
      expect(handleItemsFilter).toHaveBeenCalledWith([
        { id: 'item2', label: 'Item 2' },
        { id: 'item3', label: 'Item 3' },
      ])
    )

    fireEvent.click(checkboxA)
    await waitFor(() =>
      expect(handleItemsFilter).toHaveBeenCalledWith([
        { id: 'item1', label: 'Item 1' },
        { id: 'item2', label: 'Item 2' },
        { id: 'item3', label: 'Item 3' },
      ])
    )
    expect(handleItemsFilter).toHaveBeenCalledTimes(3)
  })

  it('renders without title when provided', () => {
    render(
      <CheckboxFilterWidget
        items={items}
        handleItemsFilter={handleItemsFilter}
      />
    )

    expect(screen.queryByText(/text/i)).not.toBeInTheDocument()

    const allCheckboxes = screen.getAllByRole('checkbox')
    expect(allCheckboxes).toHaveLength(3)
  })

  it('renders checkboxes in a row when provided', () => {
    render(
      <CheckboxFilterWidget
        direction="row"
        filterName="text"
        items={items}
        handleItemsFilter={handleItemsFilter}
        defaultCheckedItems={items}
      />
    )

    const filterName = screen.getByText('text')

    const container = screen.getByTestId('container')

    expect(container).toBeInTheDocument()
    expect(container).toHaveStyle('flex-direction: row')
    expect(filterName).toHaveStyle({
      marginBottom: 'none',
      marginRight: `${dimensions.spacing.base}`,
    })
  })
})
