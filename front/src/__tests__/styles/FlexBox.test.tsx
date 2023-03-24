import { render, screen } from '@testing-library/react'
import { FlexBox } from '../../styles'

describe('Flexbox', () => {
  it('renders correctly', () => {
    render(<FlexBox direction="center" />)
    expect(screen.getByText('center')).toBeInTheDocument()
  })
})
