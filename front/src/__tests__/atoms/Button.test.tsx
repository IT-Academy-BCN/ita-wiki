import { fireEvent, render, screen } from '@testing-library/react'
import { dimensions, colors } from '../../styles'
import { Button } from '../../components/atoms'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button data-testid="button">Test text</Button>)
    const button = screen.getByTestId('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle(`border-radius: ${dimensions.borderRadius.base}`)
    expect(button).toHaveStyle(`padding: ${dimensions.spacing.base}`)
    expect(button).toHaveStyle(`margin: ${dimensions.spacing.xxs}`)
    expect(button).toHaveStyle(`background-color: ${colors.primary}`)
    expect(button).toHaveStyle(`color: ${colors.white}`)
    expect(button).toHaveStyle('cursor: pointer')
  })

  it('renders correctly with secondary', () => {
    render(<Button data-testid="button">Test text</Button>)
    const button = screen.getByTestId('button')
  })
  it('allows to click', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)
  })
})
