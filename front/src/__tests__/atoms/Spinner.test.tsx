import { render, screen } from '@testing-library/react'
import { Spinner } from '../../components/atoms/index'

describe('Spinner', () => {
  it('renders correctly', () => {
    render(<Spinner data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })
})
