import { screen, render } from '@testing-library/react'
import { expect, it, describe } from 'vitest'
import { Label } from '../../components/atoms'
import { colors, font } from '../../styles'

describe('Label', () => {
  it('renders correctly', () => {
    render(
      <Label htmlFor="label" text="Label test">
        Label test
      </Label>
    )

    const label = screen.getByText(/label test/i)
    expect(label).toBeInTheDocument()
    expect(label).toHaveProperty('htmlFor', 'label')
    expect(label).toHaveStyle(`color: ${colors.gray.gray2}`)
    expect(label).toHaveStyle(`font-size: ${font.xs}`)
    expect(label).toHaveStyle('font-weight: 700')
  })

  it('renders hidden label', () => {
    render(
      <Label htmlFor="label" text="Label test" hiddenLabel>
        Label test
      </Label>
    )

    const label = screen.getByText(/label test/i)
    expect(label).toHaveStyle(`
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    `)
  })
})
