import { expect } from 'vitest'
import { Tooltip } from '../../components/molecules'
import { render, screen } from '../test-utils'

describe('Tooltip molecule', () => {
  it('Renders correctly tooltip', () => {
    render(
      <Tooltip size="small" tipLeft>
        Tooltip
      </Tooltip>
    )

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveStyle({
      position: 'relative',
      borderRadius: '0.625rem',
      backgroundColor: '#282828',
    })
  })

  it('Renders small tooltip', () => {
    render(
      <Tooltip size="small" tipLeft>
        Tooltip
      </Tooltip>
    )

    const smallTooltip = screen.getByRole('tooltip')
    expect(smallTooltip).toBeInTheDocument()
    expect(smallTooltip).toHaveStyle({
      minWidth: '143px',
      minHeight: '36px',
      fontWeight: '400',
    })
  })
  it('Renders medium tooltip', () => {
    render(
      <Tooltip size="medium" tipLeft>
        Tooltip
      </Tooltip>
    )

    const mediumTooltip = screen.getByRole('tooltip')
    expect(mediumTooltip).toBeInTheDocument()
    expect(mediumTooltip).toHaveStyle({
      minWidth: '90px',
      minHeight: '55px',
      fontWeight: '400',
      fontSize: '16px',
    })
  })
  it('Renders big tooltip', () => {
    render(
      <Tooltip size="big" tipLeft btnText="Big Tooltip">
        Tooltip
      </Tooltip>
    )

    const bigTooltip = screen.getByRole('tooltip')
    expect(bigTooltip).toBeInTheDocument()
    expect(bigTooltip).toHaveStyle({
      minWidth: '279px',
      minHeight: '127px',
      fontWeight: '700',
      justifyContent: 'space-around',
    })

    const buttonText = screen.getByText(/big tooltip/i)
    expect(buttonText).toBeInTheDocument()
  })
})
