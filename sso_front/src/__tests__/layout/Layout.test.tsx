import { render, screen } from '@testing-library/react'
import { Layout } from '../../components/layout'

describe('Layout', () => {
  it('renders correcty', () => {
    render(<Layout>Test</Layout>)

    const layout = screen.getByText('Test')
    expect(layout).toBeInTheDocument()
    expect(layout).toHaveStyle({ color: '#EBEBEB' })
    expect(layout).toHaveStyle({ width: '100%' })
    expect(layout).toHaveStyle({ 'min-height': '100%' })
  })
})
