import { render, screen } from '@testing-library/react'
import { Icon } from '../../components/atoms'
import { colors } from '../../styles'

describe('Icon', () => {
  it('renders correctly', () => {
    render(
      <Icon data-testid="icon" name="download" color={colors.primary}>
        download
      </Icon>
    )
    const icon = screen.getByTestId('icon')

    expect(icon).toBeInTheDocument()
    expect(screen.getByText('download')).toBeInTheDocument()

    expect(icon).toHaveClass('material-symbols-outlined')

    expect(icon).toHaveStyle(
      `font-variation-settings: 'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 48;`
    )
    expect(icon).toHaveStyle(`color: ${colors.primary}`)
  })
})
