import React from 'react'
import { render, screen } from '@testing-library/react'
import { dimensions, colors } from '../../styles'
import { Button } from '../../components/atoms'

describe('Button', () => {
  it('Renders with correct styles', () => {
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

    expect(screen.getByTestId('button')).toBeInTheDocument()
    expect(screen.getByTestId('button')).toHaveStyle(
      `border-radius: ${dimensions.borderRadius.base}`
    )
    expect(screen.getByTestId('button')).toHaveStyle(
      `padding: ${dimensions.spacing.base}`
    )
    expect(screen.getByTestId('button')).toHaveStyle(
      `margin: ${dimensions.spacing.xxs}`
    )
    expect(screen.getByTestId('button')).toHaveStyle(' width: 320px')
    expect(screen.getByTestId('button')).toHaveStyle(
      ` background-color: ${colors.primary};`
    )
    expect(screen.getByTestId('button')).toHaveStyle(`color: ${colors.white}`)
    expect(screen.getByTestId('button')).toHaveStyle('width: 320px')
    expect(screen.getByTestId('button')).toHaveStyle('cursor: pointer')
  })
})
