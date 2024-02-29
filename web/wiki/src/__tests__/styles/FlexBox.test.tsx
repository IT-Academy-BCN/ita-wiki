import { render, screen } from '@testing-library/react'
import { FlexBox } from '../../styles'

describe('Flexbox', () => {
  it('renders correctly', () => {
    render(<FlexBox>test</FlexBox>)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
