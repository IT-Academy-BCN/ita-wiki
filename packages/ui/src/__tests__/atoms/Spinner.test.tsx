import { render, screen } from '@testing-library/react'
import { Spinner } from '../../components/atoms/index'
import { colors } from '../../styles'

describe('Spinner', () => {
  const sizes = {
    xsmall: 18,
    small: 50,
    medium: 70,
    big: 133,
  }

  it('renders correctly by default', () => {
    render(<Spinner data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveStyle({ height: `${sizes.medium}px` })
    expect(spinner).toHaveStyle({ width: `${sizes.medium}px` })
    expect(spinner).toHaveStyle({
      border: `${sizes.medium / 6}px solid ${colors.outlineHover}`,
    })
    expect(spinner).toHaveStyle({
      'border-top-color': `${colors.primary}`,
    })
    expect(spinner).toHaveStyle({
      'border-right-color': `${colors.primary}`,
    })
    expect(spinner).toHaveStyle({
      'border-radius': '50%',
    })
  })

  it('renders correctly xsmall', () => {
    render(<Spinner size="xsmall" data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveStyle({ height: `${sizes.xsmall}px` })
    expect(spinner).toHaveStyle({ width: `${sizes.xsmall}px` })
    expect(spinner).toHaveStyle({
      border: `${sizes.xsmall / 6}px solid ${colors.outlineHover}`,
    })
  })

  it('renders correctly small', () => {
    render(<Spinner size="small" data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveStyle({ height: `${sizes.small}px` })
    expect(spinner).toHaveStyle({ width: `${sizes.small}px` })
    expect(spinner).toHaveStyle({
      border: `${sizes.small / 6}px solid ${colors.outlineHover}`,
    })
  })

  it('renders correctly medium', () => {
    render(<Spinner size="medium" data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveStyle({ height: `${sizes.medium}px` })
    expect(spinner).toHaveStyle({ width: `${sizes.medium}px` })
    expect(spinner).toHaveStyle({
      border: `${sizes.medium / 6}px solid ${colors.outlineHover}`,
    })
  })

  it('renders correctly big', () => {
    render(<Spinner size="big" data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveStyle({ height: `${sizes.big}px` })
    expect(spinner).toHaveStyle({ width: `${sizes.big}px` })
    expect(spinner).toHaveStyle({
      border: `${sizes.big / 6}px solid ${colors.outlineHover}`,
    })
  })
})
