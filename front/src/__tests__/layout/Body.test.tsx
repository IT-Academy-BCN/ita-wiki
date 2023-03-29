import { render, screen } from '@testing-library/react'
import { Body } from '../../components/layout'

describe('Body', () => {
  it('renders correctly', () => {
    render(<Body>test</Body>)
    const body = screen.getByText('test')
    expect(body).toBeInTheDocument()
    expect(body).toHaveStyle({ 'width': '100%' })
    expect(body).toHaveStyle({ 'min-height': '100%' })
  })
})
