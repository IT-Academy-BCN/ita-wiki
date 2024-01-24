import { render, screen } from '@testing-library/react'
import { Spinner } from '../../components/atoms/index'
import { colors } from '../../styles'

describe('Spinner', () => {
  it('renders correctly by default', () => {
    render(<Spinner data-testid="spinner" />)

    // defaultSize === medium
    const defaultSize = 70
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toHaveStyle({
      height: `${defaultSize}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      width: `${defaultSize}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      border: `${defaultSize / 6}px solid ${colors.outlineHover}`,
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

  it('renders correctly xsmall', () => {
    render(<Spinner size="xsmall" data-testid="spinner" />)

    const xsmall = 18
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toHaveStyle({
      height: `${xsmall}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      width: `${xsmall}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      border: `${xsmall / 6}px solid ${colors.outlineHover}`,
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

  it('renders correctly small', () => {
    render(<Spinner size="small" data-testid="spinner" />)

    const small = 50
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toHaveStyle({
      height: `${small}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      width: `${small}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      border: `${small / 6}px solid ${colors.outlineHover}`,
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

  it('renders correctly medium', () => {
    render(<Spinner size="medium" data-testid="spinner" />)

    const medium = 70
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toHaveStyle({
      height: `${medium}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      width: `${medium}px`,
    })
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

  it('renders correctly big', () => {
    render(<Spinner size="big" data-testid="spinner" />)

    const big = 133
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toHaveStyle({
      height: `${big}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      width: `${big}px`,
    })
    expect(screen.getByTestId('spinner')).toHaveStyle({
      border: `${big / 6}px solid ${colors.outlineHover}`,
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
