import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { dimensions, colors } from '../../styles'
import { Button } from '../../components/atoms'

const mockClick = vi.fn()

describe('Button', () => {
  it('renders correctly', () => {
    render(
      <Button data-testid="button" onClick={mockClick}>
        Test text
      </Button>
    )
    const button = screen.getByTestId('button')

    expect(button).toBeInTheDocument()
    expect(screen.getByText('Test text')).toBeInTheDocument()
    expect(button).toHaveStyle(`border-radius: ${dimensions.borderRadius.base}`)
    expect(button).toHaveStyle(`padding: ${dimensions.spacing.base}`)
    expect(button).toHaveStyle(`margin: ${dimensions.spacing.xxs}`)
    expect(button).toHaveStyle(`background-color: ${colors.primary}`)
    expect(button).toHaveStyle(`color: ${colors.white}`)
    expect(button).toHaveStyle('cursor: pointer')

    fireEvent.click(button)
    expect(mockClick).toHaveBeenCalled()
  })

  it('renders correctly with secondary', () => {
    render(
      <Button data-testid="button" secondary>
        Test text
      </Button>
    )
    const button = screen.getByTestId('button')

    expect(button).toHaveStyle(`background-color: ${colors.secondary}`)
    expect(button).toHaveStyle(`border: 2px solid ${colors.secondary}`)
    expect(button).toHaveStyle(`color: ${colors.white}`)
  })

  it('renders correctly with outline', () => {
    render(
      <Button data-testid="button" outline>
        Test text
      </Button>
    )
    const button = screen.getByTestId('button')

    expect(button).toHaveStyle(`background-color: ${colors.white}`)
    expect(button).toHaveStyle(`border: 2px solid ${colors.gray.gray4}`)
    expect(button).toHaveStyle(`color: ${colors.gray.gray1}`)
  })
})
