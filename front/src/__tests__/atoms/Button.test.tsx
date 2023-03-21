import { fireEvent, render, screen } from '@testing-library/react'
import { dimensions, colors } from '../../styles'
import { Button } from '../../components/atoms'

describe('Button', () => {
  beforeEach(() => {
    render(
      <Button
        data-testid="button"
        type="submit"
        padding={dimensions.spacing.base}
        margin={dimensions.spacing.xxs}
        backgroundColor={colors.primary}
        color={colors.white}
        width="320px"
        border="none"
      >
        Test text
      </Button>
    )
  })

  it('Renders with correct styles', () => {
    const button = screen.getByTestId('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle(`border-radius: ${dimensions.borderRadius.base}`)
    expect(button).toHaveStyle(`padding: ${dimensions.spacing.base}`)
    expect(button).toHaveStyle(`margin: ${dimensions.spacing.xxs}`)
    expect(button).toHaveStyle(`background-color: ${colors.primary}`)
    expect(button).toHaveStyle(`color: ${colors.white}`)
    expect(button).toHaveStyle('width: 320px')
    expect(button).toHaveStyle('cursor: pointer')
  })

  it('has onClick defined', () => {
    const button = screen.getByTestId('button')
    fireEvent.click(button)
  })
})
