import { fireEvent, render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import { Search, type TSearch } from '../../../components/molecules'
import { colors } from '../../../styles'

const mockHandleSearchValue = vi.fn()

const mockSearch: TSearch = {
  id: 'test',
  name: 'test',
  label: 'Test',
  searchIconName: 'search',
  searchSvgIcon: 'testIcon',
  isSearchError: false,
  handleSearchValue: mockHandleSearchValue,
}

describe('Search component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly', () => {
    render(<Search {...mockSearch} />)

    expect(screen.getByTestId('search-container-test')).toBeInTheDocument()
    expect(screen.getByTestId('search-bar-test')).toHaveStyle(
      `border: 1px solid ${colors.gray.gray4};`
    )
    expect(screen.getByTestId('input-search-test')).toBeInTheDocument()
    expect(screen.getByLabelText('Test')).toBeInTheDocument()
    expect(screen.getByText('search')).toBeInTheDocument()
    expect(screen.getByAltText('searchIcon')).toBeInTheDocument()
  })

  it('updates search value when typing', () => {
    render(<Search {...mockSearch} placeholder="placeholder" />)

    const input: HTMLInputElement = screen.getByTestId('input-search-test')
    fireEvent.change(input, { target: { value: 'test typing' } })
    expect(input.value).toBe('test typing')
  })

  it('displays error message when search has an error', () => {
    render(<Search {...mockSearch} isSearchError errorMessage="Test error" />)

    expect(screen.getByText('Test error')).toBeInTheDocument()
    expect(screen.getByTestId('search-bar-test')).toHaveStyle(
      `border: 1px solid ${colors.error};`
    )
  })

  it('clears search when close icon clicked', () => {
    render(<Search {...mockSearch} />)

    const input: HTMLInputElement = screen.getByTestId('input-search-test')

    fireEvent.change(input, { target: { value: 'test type' } })

    const closeIcon = screen.getByText('close')
    expect(input.value).toBe('test type')
    expect(closeIcon).toBeInTheDocument()

    fireEvent.click(closeIcon)

    expect(input.value).toBe('')
    expect(closeIcon).not.toBeInTheDocument()
  })

  it('calls handleSearchValue with debounced value', () => {
    const debounceDelay = 300

    render(
      <Search
        {...mockSearch}
        debounceDelay={debounceDelay}
        handleSearchValue={mockHandleSearchValue}
      />
    )

    const input: HTMLInputElement = screen.getByTestId('input-search-test')
    fireEvent.change(input, { target: { value: 'debounce value test' } })
    act(() => {
      vi.advanceTimersByTime(debounceDelay)
    })
    expect(mockHandleSearchValue).toHaveBeenCalledWith('debounce value test')
  })

  it('uses default debounce delay when value not provided', () => {
    render(<Search {...mockSearch} handleSearchValue={mockHandleSearchValue} />)

    const input: HTMLInputElement = screen.getByTestId('input-search-test')
    fireEvent.change(input, { target: { value: 'debounce default test' } })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(mockHandleSearchValue).toHaveBeenCalledWith('debounce default test')
  })
})
