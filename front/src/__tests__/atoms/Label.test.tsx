import { render, screen } from '@testing-library/react'
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
  })

  it('renders correctly without htmlFor attribute', () => {
    render(<Label text="Label test" />)

    const label = screen.getByText('Label test')
    expect(label).toBeInTheDocument()
    expect(label).not.toHaveAttribute('htmlFor')
  })

  it('renders with correct styles', () => {
    render(<Label text="Label test" />)

    const label = screen.getByText(/label test/i)
    expect(label).toHaveStyle(`color: ${colors.gray.gray2}`)
    expect(label).toHaveStyle(`font-size: ${font.large}`)
    expect(label).toHaveStyle('font-weight: 700')
  })
})
