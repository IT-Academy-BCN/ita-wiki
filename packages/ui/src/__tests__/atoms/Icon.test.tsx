import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Icon } from '../../components/atoms'
import { colors } from '../../styles'

describe('Icon', () => {
  it('renders correctly', () => {
    render(
      <Icon data-testid="icon" name="download" color={colors.primary}  >
        download
      </Icon>
    )
    const icon = screen.getByTestId('icon')

    expect(icon).toBeInTheDocument()
    expect(screen.getByText('download')).toBeInTheDocument()

    expect(icon).toHaveClass('material-symbols-outlined')

    expect(icon).toHaveStyle(
      `font-variation-settings: 'FILL' 0, 'wght' 400,'GRAD' 0, 'opsz' 48;`
    )
    expect(icon).toHaveStyle(`color: ${colors.primary}`)
  })

  it('renders correctly with fill = 1', () => {
    let isFavorite = false
    const mockOnClick = vi.fn(() => {
      isFavorite = true;
    })
    const updatedFill = isFavorite ? 1 : 0
    render(
      <Icon data-testid="icon" name="favorite" onClick={mockOnClick} $fill={updatedFill}>
        favorite
      </Icon>
    )
    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument();
    fireEvent.click(icon);
    expect(mockOnClick).toHaveBeenCalled();
    expect(icon).toHaveAttribute('name', 'favorite');
    expect(isFavorite).toBe(true);
    // expect(icon).toHaveStyle(
    //   `font-variation-settings: 'FILL' 1, 'wght' 400,'GRAD' 0, 'opsz' 48;`
    // )
  })
})
