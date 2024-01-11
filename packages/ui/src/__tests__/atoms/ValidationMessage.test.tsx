import { render, screen } from '@testing-library/react'
import { ValidationMessage } from '../../components/atoms'
import { colors, font } from '../../styles'

describe('ValidationMessage', () => {
  it('should render correctly', () => {
    render(<ValidationMessage text="test" />)

    const validationMessage = screen.getByText('test')
    expect(validationMessage).toBeInTheDocument()
    expect(validationMessage).toHaveStyle({
      color: colors.success,
    })
    expect(validationMessage).toHaveStyle({
      'font-size': font.xs,
    })
  })

  it('should render correctly on error', () => {
    render(<ValidationMessage text="test" color="error" />)

    const validationMessage = screen.getByText('test')
    expect(validationMessage).toHaveStyle({
      color: colors.error,
    })
  })

  it('should render correctly on warning', () => {
    render(<ValidationMessage text="test" color="warning" />)

    const validationMessage = screen.getByText('test')
    expect(validationMessage).toHaveStyle({
      color: colors.warning,
    })
  })
})
