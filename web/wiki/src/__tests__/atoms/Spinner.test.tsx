import { render, screen } from '@testing-library/react'
import { Spinner } from '../../components/atoms/index'
import { colors } from '../../styles'

describe('Spinner', () => {
  it('renders correctly', () => {
    render(<Spinner size="medium" data-testid="spinner" />)

    const medium = 70
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toHaveStyle({ height: `${medium}px` })
    expect(screen.getByTestId('spinner')).toHaveStyle({ width: `${medium}px` })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      border: `${medium / 6}px solid ${colors.outlineHover}`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      'border-top-color': `${colors.primary}`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      'border-right-color': `${colors.primary}`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      'border-radius': '50%',
    })
  })
})
