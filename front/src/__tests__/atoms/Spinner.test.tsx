import { render, screen } from '@testing-library/react'
import { Spinner } from '../../components/atoms/index'
import { colors } from '../../styles'

describe('Spinner', () => {
  it('renders correctly', () => {
    render(<Spinner data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toHaveStyle({ height: '133px' })
    expect(screen.getByTestId('spinner')).toHaveStyle({ width: '133px' })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      border: `20px solid ${colors.outlineHover}`,
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
